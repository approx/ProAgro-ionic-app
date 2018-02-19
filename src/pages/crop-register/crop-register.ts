import { Component,Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CropInterface } from '../../model/crop.model';
import { CropProvider } from '../../providers/crop/crop';
import { FarmProvider } from '../../providers/farm/farm';
import { FarmModel } from '../../model/farm.model';
import { FieldModel } from '../../model/field.model';
import { FieldProvider } from '../../providers/field/field';
import { CultureModel } from '../../model/culture.model';
import { CultureProvider } from '../../providers/culture/culture';
import { DomSanitizer} from '@angular/platform-browser';
import { MessagesProvider } from '../../providers/messages/messages';
import { ClientProvider } from '../../providers/client/client';
import { ClientModel } from '../../model/client.model';

/**
 * Generated class for the CropRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 interface InventoriIten{
   id:number;
   name:string;
   selected:boolean;
 }

@IonicPage({segment:'crop/register'})
@Component({
  selector: 'page-crop-register',
  templateUrl: 'crop-register.html',
})
export class CropRegisterPage {

  @Input() crop:CropInterface={
    name:''
  };
  farms:FarmModel[]=[];
  filteredFarms:FarmModel[]=[];
  fields:FieldModel[]=[];
  filteredFields:FieldModel[]=[];
  cultures:CultureModel[]=[];
  clients:ClientModel[]=[];
  farm:FarmModel;
  inventoriSelected:InventoriIten[]=[];
  mapUrl;
  client:number;

  maxDate:string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private farmProvider:FarmProvider,
    private fieldProvider:FieldProvider,
    private culturesProvider:CultureProvider,
    private sanitizer:DomSanitizer,
    private message:MessagesProvider,
    private cropProvider:CropProvider,
    private clientProvider:ClientProvider
  ) {
    let date = new Date();
    date.setFullYear(date.getFullYear()+10);
    this.maxDate = date.getFullYear()+'-12-31';
    this.farmProvider.getAll().subscribe((data:FarmModel[])=>{
      this.farms = data;
      this.filteredFarms = data;
      console.log(data);
      this.setParams();
    });
    this.fieldProvider.getAll().subscribe((data:FieldModel[])=>{
      this.fields = data;
      this.filteredFields = data;
      this.setParams();
    });
    this.culturesProvider.getAll().subscribe((data:CultureModel[])=>{
      this.cultures = data;
      this.setParams();
    });
    this.getClient();
  }

  getInventoriItens(){
    if(this.farm){
      this.inventoriSelected=[];
      let inventory_itens = this.farm.inventory_itens;
      for (let i = 0; i < inventory_itens.length; i++) {
        this.inventoriSelected.push({id:inventory_itens[i].id,name:inventory_itens[i].name,selected:false});
      }
    }
  }

  setItens(){
    this.crop.itens='';
    let insertIndex=0;
    for (let i = 0; i < this.inventoriSelected.length; i++) {
      if(this.inventoriSelected[i].selected){
        this.crop.itens+= (insertIndex==0 ? this.inventoriSelected[i].id.toString() : ';'+this.inventoriSelected[i].id);
        insertIndex++;
      }
    }
  }

  setParams(){
    let client = this.navParams.get('client');
    if(client){
      this.client = client.id;
    }

    let farm:FarmModel = this.navParams.get('farm');
    if(farm){
      this.farm = <FarmModel>this.findIdInArray(farm.id,this.farms);
      this.client = farm.client.id;
    }

    let field:FieldModel = this.navParams.get('field');
    if(field){
      this.crop.field_id = field.id;
      this.farm = <FarmModel>this.findIdInArray(field.farm.id,this.farms);
      this.client = field.farm.client.id;
    }
    this.FarmSelected();
  }

  findIdInArray(id:number,array:{id:number}[]):{id:number}{
    if(array){
      for (let i = 0; i < array.length; i++) {
        if(id==array[i].id){
          return array[i];
        }
      }
    }
    return null;
  }

  getClient(){
    this.clientProvider.getAll().subscribe((data:ClientModel[])=>{
      this.clients = data;
      this.setParams();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CropRegisterPage');
  }

  ClientSelected(){
    this.filteredFarms = this.farms.filter((farm:FarmModel)=>{
      if(!this.client){
        return true;
      }
      if(farm.client.id == this.client){
        return true;
      }
      return false;
    })

    this.filteredFields = this.fields.filter((field:FieldModel)=>{
      if(!this.farm && !this.client){
        return true;
      }
      else if(!this.farm && this.client){
        if(this.client==field.farm.client.id){
          return true;
        }
      }
      else if(field.farm.id==this.farm.id){
        this.setMapUrl();
        return true;
      }
      return false;
    });
  }

  FarmSelected(){
    this.getInventoriItens();
    console.log('starting to filter fields : '+this.fields.length);
    this.filteredFields = this.fields.filter((field:FieldModel)=>{
      if(!this.farm && !this.client){
        console.log('not find farm neither client');
        return true;
      }
      else if(!this.farm && this.client){
        if(this.client==field.farm.client.id){
          console.log('not find client');
          return true;
        }
      }
      else if(field.farm.id==this.farm.id){
        console.log('finded field with same farm');
        this.setMapUrl();
        return true;
      }
      console.log('not finded');
      return false;
    });

    if(this.farm&&!this.client){
      this.client = this.farm.client.id;
    }
  }

  FieldSelected(){
    if(this.crop.field_id&&(!this.farm||!this.client)){
      for (let i = 0; i < this.fields.length; i++) {
          if(this.fields[i].id==this.crop.field_id){
            this.client = (<ClientModel>this.findIdInArray(this.fields[i].farm.client.id,this.clients)).id;
            this.farm = <FarmModel>this.findIdInArray(this.fields[i].farm.id,this.farms);
            console.log(this.client);
          }
      }
    }
  }

  Register(){
    this.message.Wait();
    this.setItens();
    this.cropProvider.save(this.crop).subscribe((data)=>{
      this.message.SuccessAlert('Safra registrada com sucesso!');
    },(err)=>{
      this.message.ErrorAlert();
    });
  }

  setMapUrl(){
    if(this.crop.field_id){
      let field:FieldModel = <FieldModel>this.findIdInArray(this.crop.field_id,this.fields);
      this.mapUrl="https://www.google.com/maps/embed/v1/place?key=AIzaSyBocEdaAefVaBdvmzmN7yUudqb0l9yyQ-U&q="+field.lat+","+field.lng;
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.mapUrl);
    }
  }

}
