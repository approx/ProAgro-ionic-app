import { Component,ViewChild,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BasePage } from "../base/base";
import { MyApp } from '../../app/app.component';
import { FarmProvider } from '../../providers/farm/farm';
import { CurrencyPipe } from '@angular/common';

declare var google: any;

/**
 * Generated class for the FarmIndicatorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({segment:'farm/:farm_id/indicators'})
@Component({
  selector: 'page-farm-indicators',
  templateUrl: 'farm-indicators.html',
  providers:[CurrencyPipe]
})
export class FarmIndicatorsPage extends BasePage {

  farm;
  map;
  options={
    center: {lat: -34.397, lng: 150.644},
    zoom: 8,
    mapTypeId: 'satellite'
  }

  myDate;

  @ViewChild('map') mapElement;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public famrProvider:FarmProvider,
    private zone:NgZone
  ) {
    super(navCtrl);
  }

  initMap(){
    console.log(google);
    console.log(this.mapElement.nativeElement);
    this.map = new google.maps.Map(this.mapElement.nativeElement,this.options);

    console.log('iniciado')
  }

  getMap(){
    if(MyApp.instance.mapLoaded){
      console.log('not calbacked')
      this.initMap();
      this.setMarkers();
    }else{
      MyApp.instance.mapCallback= ()=>{
        console.log('calbacked')
        this.initMap()
        this.setMarkers();
      };
    }
  }


  dmsToNumber(dms:string){
    let degre = parseFloat(dms.split('°')[0]);
    let minute = parseFloat(dms.split('°')[1].split("'")[0]);
    let secont = parseFloat(dms.split('°')[1].split("'")[1].split('"')[0]);
    let orientation = dms.split('°')[1].split("'")[1].split('"')[1];
    let direction=1;
    if(orientation =='S' || orientation =='W'){
      direction=-1
    }
    return  (degre+(((minute*60)+(secont))/3600))*direction;
  }



  setMarkers(){
    let markers = [];//some array
    for (let i = 0; i < this.farm.fields.length; i++) {
      let position = new google.maps.LatLng(this.dmsToNumber(this.farm.fields[i].lat),this.dmsToNumber(this.farm.fields[i].lng));
      let icon=this.farm.fields[i].selected ? 'http://localhost:8100/assets/imgs/leaf.png':'http://localhost:8100/assets/imgs/leaf-unselected.png';
      let marker = new google.maps.Marker({
        position:position,
        map:this.map,
        title:this.farm.fields[i].name,
        icon:this.farm.fields[i].selectedCrop ? icon : 'http://localhost:8100/assets/imgs/leaf-no-crop.png'
      });
      markers.push(marker);
      google.maps.event.addListener(marker,'click',()=>this.zone.run(()=>{
        if(this.farm.fields[i].selectedCrop){
          this.farm.fields[i].selected = !this.farm.fields[i].selected;
          if(this.farm.fields[i].selected){
            marker.setIcon('http://localhost:8100/assets/imgs/leaf.png');
          }else{
            marker.setIcon('http://localhost:8100/assets/imgs/leaf-unselected.png');
          }
        }
      }));
    }
    console.log(markers[0].getPosition().lat());
    let bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++) {
      bounds.extend(markers[i].getPosition());
    }

    this.map.fitBounds(bounds);
  }

  mapUpdate(){
    this.mapFields();
    this.getMap();
  }

  mapFields(){
    this.farm.fields = this.farm.fields.map(iten=>{
      let date = new Date(this.myDate);
      for (let i = 0; i < iten.crops.length; i++) {
        let cropFinalDate = new Date(iten.crops[i].final_date);
        let cropInitalDate =  new Date(iten.crops[i].initial_date);
          if(date.getTime()<cropFinalDate.getTime() && date.getTime()>cropInitalDate.getTime()){
            console.log(this.myDate)
            console.log(cropFinalDate)
            return {...iten,selected:true,selectedCrop:iten.crops[i]}
          }
      }
      return {...iten,selected:false,selectedCrop:undefined}
    });
    console.log(this.farm);
  }

  pad(str,max){
    str=str.toString();
    return str.length < max ? this.pad("0"+str,max) : str;
  }

  ionViewDidLoad() {
    let date = new Date();
    this.myDate=date.getFullYear()+'-'+this.pad((date.getMonth()+1),2)+'-'+this.pad(date.getDate(),2);
    // this.myDate = date.getDay();
    this.farm = this.navParams.get('farm');
    if(!this.farm){
      this.famrProvider.get(this.navParams.get('farm_id')).subscribe(
        (response)=>{
          this.farm = response;
          this.mapFields();
          this.getMap();
        }
      );
    }else {
      this.mapFields();
      this.getMap();
    }
    console.log('ionViewDidLoad FarmIndicatorsPage');

  }

}
