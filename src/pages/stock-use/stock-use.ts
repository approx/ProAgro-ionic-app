import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FieldProvider } from '../../providers/field/field';
import { FieldModel } from '../../model/field.model';
import { CropProvider } from '../../providers/crop/crop';
import { CropModel } from '../../model/crop.model';
import { ActivityInterface } from '../../model/activity.model';
import { FarmProvider } from '../../providers/farm/farm';
import { FarmModel } from '../../model/farm.model';
import { StockProvider } from '../../providers/stock/stock';
import { StockModel } from '../../model/Stock.model';
import { CurrencyPipe } from '@angular/common';
import { MessagesProvider } from '../../providers/messages/messages';

/**
 * Generated class for the StockUsePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({segment:'stock/use'})
@Component({
  selector: 'page-stock-use',
  templateUrl: 'stock-use.html',
  providers:[CurrencyPipe]
})
export class StockUsePage {

  filteredFields:FieldModel[];
  fields:FieldModel[];
  filteredCrops:CropModel[];
  crops:CropModel[];
  activity:ActivityInterface={};
  farms:FarmModel[];
  stocks:StockModel[];
  maxDate;
  stockSelected;

  farmSelected;
  fieldSelected;
  activityType;
  unity_value;
  unity_valueMaksed;
  total_valueMasked;
  product_name;
  operation_date;
  payment_date;

  crop_id;
  quantity;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private farmProvider:FarmProvider,
    private fieldProvider:FieldProvider,
    private cropProvider:CropProvider,
    private stockProvider:StockProvider,
    private currency:CurrencyPipe,
    private message:MessagesProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockUsePage');

    let date = new Date();
    date.setFullYear(date.getFullYear()+10);
    this.maxDate = date.getFullYear()+'-12-31';

    this.getFarms();
    this.getFields();
    this.getCrops();
    this.getStocks();
  }

  Register(){
    this.message.Wait();
    this.stockProvider.registerUse({crop_id:this.crop_id,quantity:this.quantity,operation_date:this.operation_date,payment_date:this.payment_date},this.stockSelected).subscribe((response)=>{
      this.message.SuccessAlert('Atividade cadastrada com sucesso!');
    },(err)=>{
      this.message.ErrorAlert();
    });
  }

  filterFields(){
    this.filteredFields = this.fields.filter((field)=>{
      return field.farm.id == this.farmSelected;
    });
  }

  filterCropsByField(){
    this.filteredCrops = this.crops.filter((crop)=>{
      return crop.field.id == this.fieldSelected;
    });
  }

  filterCropsByFarm(){
    this.filteredCrops = this.crops.filter((crop)=>{
      return crop.field.farm.id == this.farmSelected;
    });
  }

  selectFarm(){
    this.filterFields();
    this.filterCropsByFarm();
  }

  getStock(id):StockModel{
    for (let i = 0; i < this.stocks.length; i++) {
        if(this.stocks[i].id == id){
          return this.stocks[i];
        }
    }
  }

  selectStock(id){
    console.log(id);
    let stock = this.getStock(id)
    this.farmSelected = stock.farm.id;
    this.selectFarm();
    this.activityType = stock.activity_type.id+' '+stock.activity_type.name;
    this.product_name = stock.product_name;
    this.unity_value = stock.unity_value;
    this.unity_valueMaksed = this.currency.transform(stock.unity_value,'BRL');
    this.calculateTotal();
  }

  calculateTotal(){
    if(this.unity_value&&this.quantity){
      this.activity.total_value = this.unity_value*this.quantity;
      this.total_valueMasked = this.currency.transform(this.activity.total_value,'BRL');
    }
  }

  getField(id:number):FieldModel{
    for (let i = 0; i < this.fields.length; i++) {
        if(this.fields[i].id == id) return this.fields[i];
    }
    return null;
  }

  getCrop(id:number):CropModel{
    for (let i = 0; i < this.crops.length; i++) {
        if(this.crops[i].id == id) return this.crops[i];
    }
  }

  getStocks(){
    this.stockProvider.getAll().subscribe((response:StockModel[])=>{
      this.stocks = response;
      console.log(response);
    },(err)=>{

    })
  }

  selectCrop(){
    let crop = this.getCrop(this.crop_id);
    this.fieldSelected = crop.field.id;
    this.farmSelected = crop.field.farm.id;
  }

  getFields(){
    this.fieldProvider.getAll().subscribe((data:FieldModel[])=>{
      this.fields = data;
      console.log(data);
      this.filteredFields = this.fields;
    })
  }

  getCrops(){
    this.cropProvider.getAll().subscribe((data:CropModel[])=>{
      this.crops = data;
      this.filteredCrops = data;
      console.log(data);
    })
  }

  getFarms(){
    this.farmProvider.getAll().subscribe((data:FarmModel[])=>{
      this.farms = data;
      console.log(data);
    })
  }

  selectField(){
    this.farmSelected = this.getField(this.fieldSelected).farm.id;
    this.filterCropsByField();
  }

}
