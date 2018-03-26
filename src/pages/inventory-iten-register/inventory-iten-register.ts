import { Component,Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InventoryItenInterface } from '../../model/inventario_iten.model';
import { FarmProvider } from '../../providers/farm/farm';
import { FarmModel } from '../../model/farm.model';
import { InventoryItenProvider } from '../../providers/inventory-iten/inventory-iten';
import { MessagesProvider } from '../../providers/messages/messages';
import { BasePage } from "../base/base";

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
})
export class InventoryItenRegisterPage extends BasePage{
  @Input() iten:InventoryItenInterface={};
  price:string;
  depreciation_value:string;
  farms:FarmModel[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private farmProvider:FarmProvider,
    private itenProvider:InventoryItenProvider,
    private messages:MessagesProvider
  ) {
    super(navCtrl);
  }

  getFarms(){
    this.farmProvider.getAll().subscribe((data:FarmModel[])=>{
      this.farms = data;
    });
  }

  setParams(){
    let farm = this.navParams.get('farm');
    if(farm){
      this.iten.farm_id = farm.id;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryItenRegisterPage');
    this.getFarms();
    this.setParams()
  }

  depreciationMounth(){
    if(this.iten.depreciation_time && this.iten.price){
      this.iten.depreciation_value = Math.round((this.iten.price / this.iten.depreciation_time)*100)/100;
      this.depreciation_value = 'R$ '+this.iten.depreciation_value;
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
