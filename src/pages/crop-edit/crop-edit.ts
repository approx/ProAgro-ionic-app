import { Component,Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CropInterface, CropModel } from '../../model/crop.model';
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
import { BasePage } from "../base/base";


/**
 * Generated class for the CropEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment:'crop/:crop_id/edit'
})
@Component({
  selector: 'page-crop-edit',
  templateUrl: 'crop-edit.html',
})
export class CropEditPage extends BasePage{

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
    super(navCtrl);
  }

  getFarms(){
    this.farmProvider.getAll().subscribe((data:FarmModel[])=>{
      this.farms = data;
      this.filteredFarms = data;
      this.setParams();
    });
  }

  getFields(){
    this.fieldProvider.getAll().subscribe((data:FieldModel[])=>{
      this.fields = data;
      this.filteredFields = data;
      this.setParams();
    });
  }

  getCultures(){
    this.culturesProvider.getAll().subscribe((data:CultureModel[])=>{
      this.cultures = data;
      this.setParams();
    });
  }

  setParams(){
    this.crop = this.navParams.get('crop');
    if(!this.crop){
      this.crop={
        name:'',
      }

      this.cropProvider.get(this.navParams.get('crop_id')).subscribe((data:CropModel)=>{
        this.crop = data;
        console.log(this.crop);
        this.farm = this.findIdInArray(data.field.farm.id,this.farms);
        this.client = data.field.farm.client.id;
        this.formatDate(this.crop);
      });
    }
    else{
      this.farm = this.findIdInArray((<CropModel>this.crop).field.farm.id,this.farms);
      this.client = (<CropModel>this.crop).field.farm.client.id;
      this.formatDate(this.crop);
    }
  }

  formatDate(crop:CropInterface){
    let initial_date = new Date(<string>crop.initial_date);
    let final_date = new Date(<string>crop.final_date);
    crop.initial_date = this.pad(initial_date.getUTCDate())+'/'+(this.pad(initial_date.getUTCMonth()+1))+'/'+initial_date.getFullYear();
    crop.final_date = this.pad(final_date.getUTCDate())+'/'+(this.pad(final_date.getUTCMonth()+1))+'/'+final_date.getFullYear();
  }

  pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
  }

  findIdInArray(id:number,array:{id:number}[]):any{
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
    let date = new Date();
    date.setFullYear(date.getFullYear()+10);
    this.maxDate = date.getFullYear()+'-12-31';
    this.getFarms();
    this.getFields();
    this.getCultures();
    this.getClient();
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
    console.log(this.crop.initial_date);
    console.log(this.crop.final_date);
    this.cropProvider.save(this.crop).subscribe((data)=>{
      this.message.SuccessAlert('Safra registrada com sucesso!');
    },(err)=>{
      this.message.ErrorAlert();
    });
  }

  setDate(){
    if(typeof this.crop.initial_date == 'string'){
      this.crop.initial_date = this.crop.initial_date.split('T')[0];
    }
    if(typeof this.crop.final_date == 'string'){
      this.crop.final_date = this.crop.final_date.split('T')[0];
    }
  }

  Update(){
    this.message.Wait();
    this.setDate();
    this.cropProvider.update(this.crop).subscribe((data)=>{
      this.message.SuccessAlert('Safra registrada com sucesso!');
    },(err)=>{
      this.message.ErrorAlert();
    })
  }

  setMapUrl(){
    if(this.crop.field_id){
      let field:FieldModel = <FieldModel>this.findIdInArray(this.crop.field_id,this.fields);
      this.mapUrl="https://www.google.com/maps/embed/v1/place?key=AIzaSyBocEdaAefVaBdvmzmN7yUudqb0l9yyQ-U&q="+field.lat+","+field.lng;
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.mapUrl);
    }
  }

}
