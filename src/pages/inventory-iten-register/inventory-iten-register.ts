import { Component,Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InventoryItenInterface } from '../../model/inventario_iten.model';
import { FarmProvider } from '../../providers/farm/farm';
import { FarmModel } from '../../model/farm.model';
import { InventoryItenProvider } from '../../providers/inventory-iten/inventory-iten';
import { MessagesProvider } from '../../providers/messages/messages';
import { BasePage } from "../base/base";
import { MyApp } from '../../app/app.component';
import { FarmListPage } from '../../pages/farm-list/farm-list';
import { CurrenciesProvider } from '../../providers/currencies/currencies';
import { CurrencyPipe } from '@angular/common';

/**
 * Generated class for the InventoryItenRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inventory-iten-register',
  templateUrl: 'inventory-iten-register.html',
  providers:[CurrencyPipe]
})
export class InventoryItenRegisterPage extends BasePage{
  @Input() iten:InventoryItenInterface={};
  price:string;
  depreciation_value:string;
  farms:FarmModel[];
  currencies;
  currency_id='USD';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private farmProvider:FarmProvider,
    private itenProvider:InventoryItenProvider,
    private messages:MessagesProvider,
    private currencyProvider:CurrenciesProvider,
    private currencyPipe:CurrencyPipe
  ) {
    super(navCtrl);
  }

  ionViewWillEnter(){
    if (MyApp.instance.user.role.id == 3) {
      console.log('sem permissão');
      this.navCtrl.push(FarmListPage.name)
      //window.history.back();
    } else {
      console.log('user passou: ' + MyApp.instance.user.role.id);
    }
  }

  getFarms(){
    this.farmProvider.getAll().subscribe((data:FarmModel[])=>{
      this.farms = data;
    });
  }

  getCurrencies(){
    this.currencyProvider.getAll().subscribe(
      (response)=>{
        this.currencies = response;
      },(err)=>{}
    );
  }

  selectFarm(farmId){
    for (let i = 0; i < this.farms.length; i++) {
        if(this.farms[i].id==farmId){
          this.currency_id = this.farms[i].currency_id;
          break;
        }
    }
  }

  setParams(){
    let farm = this.navParams.get('farm');
    if(farm){
      this.iten.farm_id = farm.id;
      this.currency_id = farm.currency_id;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryItenRegisterPage');
    this.getFarms();
    this.setParams();
    this.getCurrencies();
  }

  depreciationMounth(){
    if(this.iten.depreciation_time && this.iten.price){
      this.iten.depreciation_value = Math.round((this.iten.price / this.iten.depreciation_time)*100)/100;
      this.depreciation_value = this.currencyPipe.transform(this.iten.depreciation_value,this.currency_id);
      console.log(this.iten.depreciation_time);
    }
  }

  onPriceValueChange(){
    let value:string = this.price;
    value = value.replace(/(?=[^,])(\D)+/gi,'');
    this.iten.price=parseFloat(value);
    setTimeout(()=>{
      this.price = value.length>0 ? 'R$ '+value: '';
    },0);
    this.depreciationMounth();
  }

  reset(){
    this.iten.name = '';
    this.iten.depreciation_time = null;
    this.iten.depreciation_value = null;
    this.iten.price = null;
    this.price = '';
    this.depreciation_value = '';
  }

  Register(){
    this.messages.Wait();
    this.itenProvider.save(this.iten).subscribe((data)=>{
      this.messages.SuccessAlert('Iten cadastrado com sucesso!',()=>{this.reset()});
    },()=>{
      this.messages.ErrorAlert();
    })
  }

}
