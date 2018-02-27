import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FarmModel } from "../../model/farm.model";
import { FarmProvider } from "../../providers/farm/farm";
import { InventoryItenProvider } from "../../providers/inventory-iten/inventory-iten";
import { Observable } from "rxjs/Observable";
import { MessagesProvider } from "../../providers/messages/messages";

/**
 * Generated class for the InventoryItenSalePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 interface UpdadeProvider{
   update(iten:any):Observable<any>;
   sell(iten:any,id:number):Observable<any>;
 }

 export class UpdateItens{
   error:boolean = false;
   sending:number = 0;
   sended:number = 0;
   provider:UpdadeProvider;
   itens:any[] = [];

   constructor(provider:UpdadeProvider){
     this.provider = provider;
   }

   public Add(iten:any){
     this.itens.push(iten);
     this.sending++;
   }

   public Send(){
     return new Promise((resolve,reject)=>{
       for (let i = 0; i < this.itens.length; i++) {
         console.log(this.itens[i]);
           this.provider.sell(this.itens[i],this.itens[i].id).subscribe((data)=>{
             this.sended++;
             if(!this.error&&this.sended==this.sending){
               resolve();
             }
             else if(this.error&&this.sended==this.sending){
               reject();
             }
           },(err)=>{
             this.sended++;
             this.error = true;
             if(this.sended==this.sending){
               reject();
             }
           });
       }
     });
   }
 }

@IonicPage({
  segment:'farm/:farm_id/sale'
})
@Component({
  selector: 'page-inventory-iten-sale',
  templateUrl: 'inventory-iten-sale.html',
})
export class InventoryItenSalePage {

  farm:FarmModel;
  farm_id:number;
  maxDate;

  constructor(public navCtrl: NavController, public navParams: NavParams,private farmProvider:FarmProvider, private inventoryItenProvider:InventoryItenProvider,private message:MessagesProvider) {
    this.farm = navParams.get('farm');
    this.getParams();
    this.setMaxDate();
  }

  setMaxDate(){
    let date = new Date();
    date.setFullYear(date.getFullYear()+10);
    this.maxDate = date.getFullYear()+'-12-31';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryItenSalePage');
  }

  Register(){
    let update:UpdateItens = new UpdateItens(this.inventoryItenProvider);
    for (let i = 0; i < this.farm.inventory_itens.length; i++) {
        if(this.farm.inventory_itens[i].selected){
          update.Add(this.farm.inventory_itens[i]);
        }
    }
    this.message.Wait()
    update.Send().then(()=>{
      this.message.SuccessAlert('Sucesso vendas cadastradas com suscesso!');
    }).catch(()=>{
      this.message.ErrorAlert();
    })
  }

  getParams(){
    if(!this.farm){
      this.farmProvider.get(this.navParams.get('farm_id')).subscribe((data:FarmModel)=>{
        this.farm=data;
        for (let i = 0; i < this.farm.inventory_itens.length; i++) {
            this.farm.inventory_itens[i].selected = false;
        }
        console.log(this.farm);
      });
    }
  }

}
