import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CropModel } from '../../model/crop.model';
import { CropProvider } from '../../providers/crop/crop';
import { ActivityRegisterPage } from '../../pages/activity-register/activity-register';
import { ActivityDetailPage } from '../../pages/activity-detail/activity-detail';
import { CropEditPage } from "../crop-edit/crop-edit";

/**
 * Generated class for the CropDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({segment:'crop/:crop_id'})
@Component({
  selector: 'page-crop-detail',
  templateUrl: 'crop-detail.html',
})
export class CropDetailPage {

  crop:CropModel;
  crop_id:number;
  percentage:number;
  total_value:number;
  total_value_ha:number=0;
  itens_total_value:number;
  itens_depreciation_value:number;


  constructor(public navCtrl: NavController, public navParams: NavParams,private cropProvider:CropProvider) {
    this.crop_id = navParams.get('crop_id');
    this.crop = navParams.get('crop');
    console.log(this.crop)
  }

  openRegisterPage(event:MouseEvent){
    event.stopPropagation();
    event.preventDefault();
    this.navCtrl.push(ActivityRegisterPage.name,{crop:this.crop});
  }

  openEditPage(event:MouseEvent){
    event.stopPropagation();
    event.preventDefault();
    this.navCtrl.push(CropEditPage.name,{crop:this.crop,crop_id:this.crop.id});
  }

  openActivityPage(activity){
    this.navCtrl.push(ActivityDetailPage.name,{activity_id:activity.id});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CropDetailPage');
    if(!this.crop&&this.crop_id){
      this.cropProvider.get(this.crop_id).subscribe((data:CropModel)=>{
        this.crop=data;
        console.log(this.crop);
        this.calculatePercentage();
        this.calculateTotal();
        this.calculateTotalInventario();
      });
    }
    else{
      this.calculateTotal();
      this.calculatePercentage();
      this.calculateTotalInventario();
    }
  }

  calculateTotalInventario(){
    this.itens_total_value = 0;
    this.itens_depreciation_value = 0;
    for (let i = 0; i < this.crop.inventory_itens.length; i++) {
        this.itens_total_value+=this.crop.inventory_itens[i].price;
        this.itens_depreciation_value+=this.crop.inventory_itens[i].depreciation_value;
    }
  }

  calculateTotal(){
    this.total_value=0;
    this.total_value_ha=0;
    for (let i = 0; i < this.crop.activities.length; i++) {
      this.total_value +=  this.crop.activities[i].total_value;
      this.total_value_ha += this.crop.activities[i].value_per_ha;
    }
  }

  calculatePercentage(){
    let initialTime = new Date(this.crop.initial_date).getTime();
    let finalTime = new Date(this.crop.final_date).getTime();

    let timeVariation = finalTime - initialTime;

    let nowVariation = new Date().getTime() - initialTime ;
    console.log(timeVariation)
    nowVariation = Math.max(0,nowVariation);
    console.log(nowVariation)

    this.percentage = (100*nowVariation)/timeVariation;
    console.log(this.percentage)
    this.percentage = Math.min(100,Math.round(this.percentage));
  }

}
