import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BasePage } from "../base/base";
import { MyApp } from '../../app/app.component';
import { FarmProvider } from '../../providers/farm/farm';

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
})
export class FarmIndicatorsPage extends BasePage {

  farm;
  map;
  options={
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  }

  @ViewChild('map') mapElement;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public famrProvider:FarmProvider
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
      let marker = new google.maps.Marker({
        position:position,
        map:this.map,
        title:this.farm.fields[i].name,
        icon:'http://localhost:8100/assets/imgs/leaf-unselected.png'
      });
      markers.push(marker);

      google.maps.event.addListener(marker,'click',()=>{
        if(marker.icon=='http://localhost:8100/assets/imgs/leaf-unselected.png'){
          marker.setIcon('http://localhost:8100/assets/imgs/leaf.png');
        }else{
          marker.setIcon('http://localhost:8100/assets/imgs/leaf-unselected.png');
        }
      });
    }
    console.log(markers[0].getPosition().lat());
    let bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++) {
      bounds.extend(markers[i].getPosition());
    }

    this.map.fitBounds(bounds);
  }

  ionViewDidLoad() {
    this.farm = this.navParams.get('farm');
    if(!this.farm){
      this.famrProvider.get(this.navParams.get('farm_id')).subscribe(
        (response)=>{
          this.farm = response;
          this.getMap();
        }
      );
    }else {
      this.getMap();
    }
    console.log('ionViewDidLoad FarmIndicatorsPage');

  }

}
