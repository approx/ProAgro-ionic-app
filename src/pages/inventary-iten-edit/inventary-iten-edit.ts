import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InventoryItenProvider } from '../../providers/inventory-iten/inventory-iten';
import { MessagesProvider } from '../../providers/messages/messages';

/**
 * Generated class for the InventaryItenEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({segment:'inventary/:iten_id/edit'})
@Component({
  selector: 'page-inventary-iten-edit',
  templateUrl: 'inventary-iten-edit.html',
})
export class InventaryItenEditPage {
    item;
    farm;

  constructor(public navCtrl: NavController, public navParams: NavParams,private inventoryItenProvider:InventoryItenProvider,private message:MessagesProvider) {
      this.getIten();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventaryItenEditPage');
  }

  getIten(){
      this.item = this.navParams.get('inventory_iten');

      if(!this.item){
        this.inventoryItenProvider.get(this.navParams.get('iten_id')).subscribe(
          (response)=>{
            this.item = response;
            this.farm =  {...this.item.farm};
            // this.item.depreciation_value = this.item.depreciation_value.replace('.',',');
            console.log(response);
          }
        );
      }
  }

  calculateTotal(){
      this.item.depreciation_value = this.item.price/this.item.depreciation_time;
      console.log(this.item.depreciation_value)
  }

  onSubmit(){
      delete this.item.farm;
      delete this.item.created_at;
      delete this.item.updated_at;
      this.message.Wait();
      this.inventoryItenProvider.update(this.item).subscribe((data)=>{
        this.message.SuccessAlert('Sucesso, atividade alterada!');
        this.navCtrl.push('FarmDetailPage',{farm_id:this.item.farm_id})
      },(err)=>{
        this.message.ErrorAlert();
      })
  }

}
