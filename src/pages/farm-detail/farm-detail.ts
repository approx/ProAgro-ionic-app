import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FarmModel } from '../../model/farm.model';
import { MyApp } from '../../app/app.component';
import { FarmProvider } from '../../providers/farm/farm';
import { FieldRegisterPage } from '../../pages/field-register/field-register';
import { FieldDetailPage } from '../../pages/field-detail/field-detail';
import { CropRegisterPage } from '../../pages/crop-register/crop-register';
import { InventoryItenRegisterPage } from '../../pages/inventory-iten-register/inventory-iten-register';
import { FarmEditPage } from "../farm-edit/farm-edit";
import { DomSanitizer } from "@angular/platform-browser";
import { InventoryItenSalePage } from "../../pages/inventory-iten-sale/inventory-iten-sale";
import { BasePage } from "../base/base";
import { MessagesProvider } from '../../providers/messages/messages';
import { FarmListPage } from '../farm-list/farm-list';

/**
 * Generated class for the FarmDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment:'farm/:farm_id'
})
@Component({
  selector: 'page-farm-detail',
  templateUrl: 'farm-detail.html',
})
export class FarmDetailPage extends BasePage{
  farm_id:number;
  farm:FarmModel;
  userClient:boolean;
  mapUrl;
  actions=[
  {
    label:'Adicionar Talhão',
    down:()=>{
      console.log('open');
      this.navCtrl.push(FieldRegisterPage.name,{farm:this.farm});
    }
  },
  {
    label:'Adicionar Nova Safra',
    down:()=>{
      this.navCtrl.push(CropRegisterPage.name,{farm:this.farm});
    }
  },
  {
    label:'Registar Venda',
    down:()=>{
      this.navCtrl.push(InventoryItenSalePage.name,{farm:this.farm,farm_id:this.farm.id});
    }
  }];

  total_value:number;
  total_depreciation_value:number;
  total_remunaration:number;

  constructor(public navCtrl: NavController, public navParams: NavParams,private farmProvider:FarmProvider,private sanitizer:DomSanitizer,private message:MessagesProvider) {
    super(navCtrl);
    MyApp.instance.user;
    this.userClient = MyApp.instance.user.role.id == 3;
  }

  openFieldPage(field){
    this.navCtrl.push(FieldDetailPage.name,{field_id:field.id});
  }

  openFieldRegister(event:MouseEvent){
    event.preventDefault();
    event.stopPropagation();
    this.navCtrl.push(FieldRegisterPage.name,{farm:this.farm});
  }

  openEditPage(event:MouseEvent){
    event.preventDefault();
    event.stopPropagation();
    this.navCtrl.push(FarmEditPage.name,{farm:this.farm,farm_id:this.farm.id});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmDetailPage');
    this.farm_id = this.navParams.get('farm_id');
    this.farm = this.navParams.get('farm');
    if(!this.farm&&this.farm_id){
      this.farmProvider.get(this.farm_id).subscribe((data:FarmModel)=>{
        this.farm=data;
        console.log(this.farm);
        this.calculateTotal();
        this.setMapUrl();
      });
    }
    else{
      this.setMapUrl();
      this.calculateTotal();
    }
  }

  delete(){
    this.message.ShowConfirmMessage('Deletar Fazenda',"tem certeza que deseja deletar esta fazenda? todas as atividades,safras e talhões relacionadas a ela também serão deletados",()=>{
      this.message.Wait();
      this.farmProvider.delete(this.farm.id).subscribe((response)=>{
        this.message.SuccessAlert('Fazenda deletada com sucesso!');
        this.navCtrl.push(FarmListPage.name);
      },(err)=>{
        this.message.ErrorAlert();
      })
    });
  }

  diffInMonths(d1:Date,d2:Date){
    let yearsdiff = Math.abs(d1.getFullYear()-d2.getFullYear());
    let monthdiff = Math.abs(d1.getMonth()-d2.getMonth());

    return (yearsdiff*12)+monthdiff;
  }

  setMapUrl(){
    if(this.farm.lat&&this.farm.lng){
      this.mapUrl="https://www.google.com/maps/embed/v1/place?key=AIzaSyBocEdaAefVaBdvmzmN7yUudqb0l9yyQ-U&q="+this.farm.lat+","+this.farm.lng;
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.mapUrl);
    }
    console.log('changed')
  }

  calculateTotal(){
    let monthDiff = this.diffInMonths(new Date(this.farm.created_at),new Date());
    this.total_remunaration = monthDiff * this.farm.remuneration;
    this.total_value = parseFloat(this.farm.capital_tied.toString())+parseFloat(this.total_remunaration.toString());
    this.total_depreciation_value = 0;
    if(this.farm.inventory_itens.length>0){
      for (let i = 0; i < this.farm.inventory_itens.length; i++) {
          this.total_value+=parseFloat(this.farm.inventory_itens[i].price.toString());
          this.total_depreciation_value+=parseFloat(this.farm.inventory_itens[i].depreciation_value.toString());
      }
    }
    this.total_depreciation_value = Math.round(this.total_depreciation_value*100)/100;
    this.total_value = Math.round(this.total_value*100)/100;
  }

  openRegisterInventory(event:MouseEvent){
    event.preventDefault();
    event.stopPropagation();
    this.navCtrl.push(InventoryItenRegisterPage.name,{farm:this.farm});
  }

  ionViewCanEnter(): boolean{
    return MyApp.instance.loged;
  }

}
