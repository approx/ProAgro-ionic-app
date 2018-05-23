import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CropModel } from "../../model/crop.model";
import { CropProvider,RegisterSack } from "../../providers/crop/crop";
import { MessagesProvider } from "../../providers/messages/messages";
import { BasePage } from "../base/base";
import { MyApp } from '../../app/app.component';
import { CropListPage } from '../../pages/crop-list/crop-list';
import { CurrenciesProvider } from '../../providers/currencies/currencies';
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
export class CropRegisterSackPage extends BasePage{

  crop:CropModel;
  registerSack:RegisterSack={currency_id:'BRL'};
  value:string;
  total_value;
  currencies;

  constructor(public navCtrl: NavController, public navParams: NavParams,public cropProvider:CropProvider, public messenger:MessagesProvider,public currencyProvider:CurrenciesProvider) {
    super(navCtrl);
  }

  ionViewWillEnter(){
    if (MyApp.instance.user.role.id == 3) {
      console.log('sem permissão');
      this.navCtrl.push(CropListPage.name)
      //window.history.back();
    } else {
      console.log('user passou: ' + MyApp.instance.user.role.id);
    }
  }

  getCurrencies(){
    this.currencyProvider.getAll().subscribe(
      (response)=>{
        this.currencies = response;
      },(err)=>{

      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CropRegisterSackPage');
    this.crop = this.navParams.get('crop');
    if(!this.crop){
      this.cropProvider.get(this.navParams.get('crop_id')).subscribe((data:CropModel)=>{
        this.crop=data;
        console.log(this.crop);
      });
    }
    this.getCurrencies();
  }

  calculateTotalValue(){
    if(this.registerSack.quantity&&this.registerSack.value){
      this.total_value = this.registerSack.quantity * this.registerSack.value;
      // this.total_value = this.total_value.replace('.',',');
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
