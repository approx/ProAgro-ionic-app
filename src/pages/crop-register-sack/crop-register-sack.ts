import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CropModel } from "../../model/crop.model";
import { CropProvider,RegisterSack } from "../../providers/crop/crop";
import { MessagesProvider } from "../../providers/messages/messages";

/**
 * Generated class for the CropRegisterSackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment:'crop/:crop_id/register_sack'
})
@Component({
  selector: 'page-crop-register-sack',
  templateUrl: 'crop-register-sack.html',
})
export class CropRegisterSackPage {

  crop:CropModel;
  registerSack:RegisterSack={};
  value:string;
  total_value:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public cropProvider:CropProvider, public messenger:MessagesProvider) {
    this.crop = navParams.get('crop');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CropRegisterSackPage');
    if(!this.crop){
      this.cropProvider.get(this.navParams.get('crop_id')).subscribe((data:CropModel)=>{
        this.crop=data;
        console.log(this.crop);
      });
    }
  }

  calculateTotalValue(){
    if(this.registerSack.quantity&&this.registerSack.value){
      this.total_value = 'R$ '+this.registerSack.quantity * this.registerSack.value;
      this.total_value = this.total_value.replace('.',',');
    }
  }

  OnValueChange($event){
    let value:string = $event;
    value = value.replace(/(?=[^,])(\D)+/gi,'');
    this.registerSack.value = parseFloat(value.replace(',','.'));
    setTimeout(()=>{
      this.value = value.length>0 ? 'R$ '+value: '';
    },0);
    this.calculateTotalValue();
  }

  Register(){
    this.messenger.Wait();
    this.cropProvider.register_sack(this.registerSack,this.crop.id).subscribe((data)=>{
      this.messenger.SuccessAlert('Venda de sacas registrado com suscesso!');
    },(err)=>{
      this.messenger.ErrorAlert();
    });
  }

}
