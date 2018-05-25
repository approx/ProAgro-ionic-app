import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FarmModel } from "../../model/farm.model";
import { FarmProvider } from "../../providers/farm/farm";
import { InventoryItenProvider } from "../../providers/inventory-iten/inventory-iten";
import { Observable } from "rxjs/Observable";
import { MessagesProvider } from "../../providers/messages/messages";
import { BasePage } from "../base/base";
import { MyApp } from '../../app/app.component';
import { FarmListPage } from '../../pages/farm-list/farm-list';
import { CropProvider } from '../../providers/crop/crop';

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

   public Send(propagateByProduction,crops){
     return new Promise((resolve,reject)=>{
       for (let i = 0; i < this.itens.length; i++) {
         console.log(this.itens[i]);
           this.provider.sell({...this.itens[i],propagateByProduction:propagateByProduction,crops:crops},this.itens[i].id).subscribe((data)=>{
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
export class InventoryItenSalePage extends BasePage{

  farm:FarmModel;
  farm_id:number;
  maxDate;
  propagateByProduction=true;
  useActualCrops=true;
  actualCrop=[];
  selectedCrops;
  crops;
  filteredCrops;
  selectedAll;
  cropSearch;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private farmProvider:FarmProvider,
    private inventoryItenProvider:InventoryItenProvider,
    private message:MessagesProvider,
    private cropProvider:CropProvider
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

  setMaxDate(){
    let date = new Date();
    date.setFullYear(date.getFullYear()+10);
    this.maxDate = date.getFullYear()+'-12-31';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryItenSalePage');
    this.farm = this.navParams.get('farm');
    this.getParams();
    this.setMaxDate();
    this.getCrops();
  }

  Register(){
    let update:UpdateItens = new UpdateItens(this.inventoryItenProvider);
    for (let i = 0; i < this.farm.inventory_itens.length; i++) {
        if(this.farm.inventory_itens[i].selected){
          update.Add(this.farm.inventory_itens[i]);
        }
    }
    this.message.Wait()
    let cropsIds='';
    this.crops.forEach((crop,i)=>{
      if(crop.selected){
        if(cropsIds==''){
          cropsIds+=crop.id;
        }else{
          cropsIds+=';'+crop.id;
        }
      }
    })
    update.Send(this.propagateByProduction,cropsIds).then(()=>{
      this.message.SuccessAlert('Sucesso vendas cadastradas com suscesso!');
    }).catch(()=>{
      this.message.ErrorAlert();
    })
  }

  getCrops(){
    this.cropProvider.getAll().subscribe(
      (response)=>{
        this.crops = response.map((crop)=>{
          return {...crop,selected:false};
        });
        // console.log(response)
        let today = new Date();
        this.crops.forEach((crop)=>{
          let cropFinalDate = new Date(crop.final_date);
          if(cropFinalDate.getTime()>today.getTime()){
            crop.selected = true;
          }
        });
        this.filteredCrops = this.crops;
        console.log(this.actualCrop)
      },(err)=>{}
    );
  }

  onSearch(){
    this.filter();
  }

  filter(){
    this.filteredCrops = this.filterCropsByName(this.crops);
    if(this.selectedAll){
      this.selectedAll = false;
      this.selectAll();
    }
  }

  selectAll(){
    if(this.selectedAll){
      this.filteredCrops.forEach((element,index)=>{
        element.selected = true;
      });
    }else{
      this.crops.forEach((element,index)=>{
        element.selected = false;
      });
    }
  }

  useActualCropsChange(){
    if(this.useActualCrops){
      this.cropSearch = '';
      this.filteredCrops = this.crops;
      this.selectedAll = false;
      this.crops.forEach((crop)=>{
        crop.selected = false;
      });
      let today = new Date();
      this.crops.forEach((crop)=>{
        let cropFinalDate = new Date(crop.final_date);
        if(cropFinalDate.getTime()>today.getTime()){
          crop.selected = true;
        }
      });
    }
  }

  filterCropsByName(crops){
    return crops.filter((crops)=>{
      return crops.name.toLowerCase().indexOf(this.cropSearch.toLowerCase())!=-1||crops.field.name.toLowerCase().indexOf(this.cropSearch.toLowerCase())!=-1||this.cropSearch=='';
    });
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
