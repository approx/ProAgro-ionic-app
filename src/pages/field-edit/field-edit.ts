import { Component,Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FieldInterface, FieldModel } from '../../model/field.model';
import { FieldProvider } from '../../providers/field/field';
import { MessagesProvider } from '../../providers/messages/messages';
import { DomSanitizer} from '@angular/platform-browser';
import { FarmModel } from '../../model/farm.model';
import { FarmProvider } from '../../providers/farm/farm';
import { ClientProvider } from '../../providers/client/client';
import { ClientModel } from '../../model/client.model';

/**
 * Generated class for the FieldEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment:'field/:field_id/edit'
})
@Component({
  selector: 'page-field-edit',
  templateUrl: 'field-edit.html',
})
export class FieldEditPage {

  @Input() field:FieldInterface={};
  filteredFarms:FarmModel[];
  farms:FarmModel[]=[];
  clients:ClientModel[];
  mapUrl;
  client_id:number;
  field_id:number;
  loaded:boolean=false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fieldProvider:FieldProvider,
    private message:MessagesProvider,
    private sanitizer:DomSanitizer,
    private farmProvider:FarmProvider,
    private clientProvider:ClientProvider
  ) {
    this.farmProvider.getAll().subscribe((data:FarmModel[])=>{
      this.farms = data;
      this.filteredFarms = data;
      this.ClientSelected();
      this.setParamsItens();
    })
    this.getClients();
    this.getField();
  }

  findIdInArray(id:number,array:{id:number}[]):{id:number}{
    for (let i = 0; i < array.length; i++) {
        if(id==array[i].id){
          return array[i];
        }
    }
    return null;
  }

  setParamsItens(){
    let client:ClientModel = this.navParams.get('client');
    if(client){
      this.client_id = client.id;
    }
    let farm:FarmModel = this.navParams.get('farm');
    if(farm){
      this.field.farm_id = farm.id;
      this.client_id =farm.client.id;
    }
  }

  getClients(){
    this.clientProvider.getAll().subscribe((data:ClientModel[])=>{
      this.clients = data;
      this.ClientSelected();
      this.setParamsItens();
    });
  }

  ClientSelected(){
    this.filteredFarms = this.farms.filter((farm)=>{
      if(this.client_id == farm.client.id){
        return true;
      }
      return false;
    });
    if(this.filteredFarms.length==0 && !this.client_id){
      this.filteredFarms = this.farms;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FieldRegisterPage');
  }

  getField(){
    this.field_id = this.navParams.get('field_id');
    this.field = this.navParams.get('field');
    if(!this.field){
      this.field={};
      this.fieldProvider.get(this.field_id).subscribe((data:FieldModel)=>{
        this.loaded = true;
        this.field=data;
        this.field.farm_id = (<FieldModel>data).farm.id;
        this.client_id = (<FieldModel>data).farm.client.id;
        console.log(this.field);
        this.setMapUrl();
      });
    }
    else{
      this.loaded = true;
      this.field.farm_id = (<FieldModel>this.field).farm.id;
      this.client_id = (<FieldModel>this.field).farm.client.id;
      console.log(this.field);
      this.setMapUrl();
    }
  }

  setMapUrl(){
    if(this.field.lat&&this.field.lng){
      this.mapUrl="https://www.google.com/maps/embed/v1/place?key=AIzaSyBocEdaAefVaBdvmzmN7yUudqb0l9yyQ-U&q="+this.field.lat+","+this.field.lng;
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.mapUrl);
    }
    console.log('changed')
  }

  Update(){
    this.message.Wait();
    this.fieldProvider.update(this.field).subscribe((data)=>{
      this.message.SuccessAlert('Talhão editado com suscesso!');
    },(err)=>{this.message.ErrorAlert();})
  }

}
