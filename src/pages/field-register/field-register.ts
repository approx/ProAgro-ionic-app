import { Component,Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FieldInterface } from '../../model/field.model';
import { FieldProvider } from '../../providers/field/field';
import { MessagesProvider } from '../../providers/messages/messages';
import { DomSanitizer} from '@angular/platform-browser';
import { FarmModel } from '../../model/farm.model';
import { FarmProvider } from '../../providers/farm/farm';
import { ClientProvider } from '../../providers/client/client';
import { ClientModel } from '../../model/client.model';
import { FieldTypesProvider } from "../../providers/field-types/field-types";
import { FieldTypeModel } from "../../model/fieldType.model";
import { BasePage } from "../base/base";

/**
 * Generated class for the FieldRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({segment:'field/register'})
@Component({
  selector: 'page-field-register',
  templateUrl: 'field-register.html',
})
export class FieldRegisterPage extends BasePage{

  @Input() field:FieldInterface={};
  filteredFarms:FarmModel[];
  farms:FarmModel[]=[];
  clients:ClientModel[];
  fieldTypes:FieldTypeModel[];
  mapUrl;
  client_id:number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fieldProvider:FieldProvider,
    private message:MessagesProvider,
    private sanitizer:DomSanitizer,
    private farmProvider:FarmProvider,
    private clientProvider:ClientProvider,
    private fieldTypeProvider:FieldTypesProvider
  ) {
    super(navCtrl);
  }

  findIdInArray(id:number,array:{id:number}[]):{id:number}{
    for (let i = 0; i < array.length; i++) {
        if(id==array[i].id){
          return array[i];
        }
    }
    return null;
  }

  getFieldTypes(){
    this.fieldTypeProvider.getAll().subscribe((data:FieldTypeModel[])=>{
      this.fieldTypes = data;
      console.log(data);
    });
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
    this.farmProvider.getAll().subscribe((data:FarmModel[])=>{
      this.farms = data;
      this.filteredFarms = data;
      this.ClientSelected();
      this.setParamsItens();
    })
    this.getClients();
    this.getFieldTypes();
  }

  setMapUrl(){
    if(this.field.lat&&this.field.lng){
      this.mapUrl="https://www.google.com/maps/embed/v1/place?key=AIzaSyBocEdaAefVaBdvmzmN7yUudqb0l9yyQ-U&q="+this.field.lat+","+this.field.lng;
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.mapUrl);
    }
    console.log('changed')
  }

  Register(){
    this.message.Wait();
    this.fieldProvider.save(this.field).subscribe((data)=>{
      this.message.SuccessAlert('Talhão registrado com sucesso!');
    },(err)=>{
      this.message.ErrorAlert();
    });
  }

}
