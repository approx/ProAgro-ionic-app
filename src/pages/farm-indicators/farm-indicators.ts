import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BasePage } from "../base/base";
import { MyApp } from '../../app/app.component';

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

  map;
  options={
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  }

  @ViewChild('map') mapElement;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    super(navCtrl);
  }

  initMap(){
    console.log(google);
    console.log(this.mapElement.nativeElement);
    this.map = new google.maps.Map(this.mapElement.nativeElement,this.options);
    console.log('iniciado')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmIndicatorsPage');
    if(MyApp.instance.mapLoaded){
      console.log('not calbacked')
      this.initMap();
    }else{
      MyApp.instance.mapCallback= ()=>{
        console.log('calbacked')
        this.initMap()
      };
    }
  }

}
