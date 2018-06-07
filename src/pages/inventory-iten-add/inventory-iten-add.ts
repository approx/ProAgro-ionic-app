import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CropProvider } from '../../providers/crop/crop';
import { MessagesProvider } from '../../providers/messages/messages';

/**
 * Generated class for the InventoryItenAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({segment:'crop/:crop_id/inventory-add'})
@Component({
  selector: 'page-inventory-iten-add',
  templateUrl: 'inventory-iten-add.html',
})
export class InventoryItenAddPage {

  crop;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cropProvider: CropProvider,
    private message: MessagesProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryItenAddPage');
    this.getCrop()
  }

  getCrop(){
    this.crop = this.navParams.get('crop');

    if(!this.crop){
      this.cropProvider.get(this.navParams.get('crop_id')).subscribe(
        (response)=>{
          this.crop = response;
          this.mapItens();
        }
      );
    }else {
      this.mapItens();
    }
  }

  Register(){
    let ids='';
    this.crop.field.farm.inventory_itens.forEach(item=>{
      if(item.selected){
        ids+=item.id+';';
      }
    });

    ids = ids.slice(0, -1);
    this.message.Wait();
    this.cropProvider.update_inventory_itens(this.crop.id,ids).subscribe(
      response=>{
        this.message.SuccessAlert('Inventario atualizado com sucesso!',()=>{
          this.navCtrl.push('CropDetailPage',{crop_id:this.crop.id});
        });
      },err=>{
        this.message.ErrorAlert();
      }
    );
  }

  mapItens(){
    this.crop.field.farm.inventory_itens = this.crop.field.farm.inventory_itens.map(item=>{
      for (let i = 0; i < this.crop.inventory_itens.length; i++) {
          if(this.crop.inventory_itens[i].id==item.id){
            return {...item,selected:true};
          }
      }
      return {...item,selected:false};
    });
  }



}
