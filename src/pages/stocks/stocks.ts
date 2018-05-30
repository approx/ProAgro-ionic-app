import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FarmModel } from '../../model/farm.model';
import { FarmProvider } from '../../providers/farm/farm';
import { StockInterface } from '../../model/Stock.model';
import { ActivityTypeProvider } from '../../providers/activity-type/activity-type';
import { ActivityTypeModel } from '../../model/activityType.model';
import { SelectSearchableComponent } from 'ionic-select-searchable';
import { CurrencyPipe } from '@angular/common';
import { MessagesProvider } from '../../providers/messages/messages';

/**
 * Generated class for the StocksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({segment:'farm/:farm_id/stocks'})
@Component({
  selector: 'page-stocks',
  templateUrl: 'stocks.html',
  providers: [CurrencyPipe]
})
export class StocksPage {

  farm:FarmModel;
  stock:StockInterface={};
  activityTypes:ActivityTypeModel[];
  activityType;
  total_value;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private farmProvider:FarmProvider,
    private typesProvider:ActivityTypeProvider,
    private currency:CurrencyPipe,
    private message:MessagesProvider
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StocksPage');

    let farm_id = this.navParams.get('farm_id');
    this.farm = this.navParams.get('farm');
    if(!this.farm&&farm_id){
      this.farmProvider.get(farm_id).subscribe((data:FarmModel)=>{
        this.farm=data;
        this.getTypes();
      });
    }else{
      this.getTypes();
    }
  }

  Register(){
    this.message.Wait();
    this.farmProvider.createStock(this.farm.id,this.stock).subscribe((response)=>{
      this.message.SuccessAlert('Estoque registrado com sucesso!');
      this.farmProvider.get(this.farm.id).subscribe((data:FarmModel)=>{
        this.farm=data;
        this.getTypes();
      });
    },(err)=>{
      this.message.ErrorAlert();
    })
  }

  portChange(event: { component: SelectSearchableComponent, value: any }) {
    if (event.value != null) {
      this.stock.activity_type_id = event.value.id;
    } else {
      this.stock.activity_type_id = undefined;
    }
    // console.log('port:', event.value);
  }

  calculateTotal(){
    if(this.stock.unity_value && this.stock.quantity){
      this.total_value = this.currency.transform(this.stock.unity_value * this.stock.quantity,'BRL');
    }
  }

  getTypes(){
    this.typesProvider.getAll().subscribe((data:ActivityTypeModel[])=>{
      this.activityTypes = data;
      this.activityType = '';
      for (var i = 0; i < this.activityTypes.length; i++) {
        this.activityTypes[i].name = this.activityTypes[i].id + ' ' + this.activityTypes[i].name;
      }
    })
  }



}
