import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClientProvider } from "../../providers/client/client";
import { ClientModel } from "../../model/client.model";
import { FarmModel } from "../../model/farm.model";
import { FieldModel } from "../../model/field.model";
import { ActivityModel, ActivityInterface } from "../../model/activity.model";
import { UnityModel } from "../../model/unity.model";
import { FarmProvider } from "../../providers/farm/farm";
import { FieldProvider } from "../../providers/field/field";
import { ActivityProvider } from "../../providers/activity/activity";
import { UnityProvider } from "../../providers/unity/unity";
import { ActivityTypeModel } from "../../model/activityType.model";
import { ActivityTypeProvider } from "../../providers/activity-type/activity-type";
import { CropModel } from "../../model/crop.model";
import { CropProvider } from "../../providers/crop/crop";
import { MessagesProvider } from "../../providers/messages/messages";
import { ActivityIten } from "../activity-register/activity-register";
import { BasePage } from "../base/base";

/**
 * Generated class for the ActivityEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment:'activity/:activity_id/edit'
})
@Component({
  selector: 'page-activity-edit',
  templateUrl: 'activity-edit.html',
})
export class ActivityEditPage extends BasePage {
  clients:ClientModel[]=[];
  client:ClientModel;

  farms:FarmModel[]=[];
  farm:FarmModel;
  filteredFarms:FarmModel[]=[];

  fields:FieldModel[]=[];
  field:FieldModel;
  filteredFields:FieldModel[]=[];

  unity_value:number;

  crops:CropModel[]=[];
  filteredCrops:CropModel[]=[];

  activity_types:ActivityTypeModel[]=[];

  unities:UnityModel[]=[];

  activity:ActivityInterface={};

  activity_type:ActivityTypeModel={
    id:undefined,
    name:'',
    unity_id:undefined,
    unity:undefined,
    activities:[]
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private clientProvider:ClientProvider,
    private farmProvider:FarmProvider,
    private fieldProvider:FieldProvider,
    private activityTypesProvider:ActivityTypeProvider,
    private unityProvider:UnityProvider,
    private cropProvider:CropProvider,
    private activityProvider:ActivityProvider,
    private message:MessagesProvider
  ) {
    super(navCtrl);
  }

  getClients(){
    this.clientProvider.getAll().subscribe((data:ClientModel[])=>{
      this.clients = data;
    });
  }

  getFarms(){
    this.farmProvider.getAll().subscribe((data:FarmModel[])=>{
      this.farms = data;
      this.filteredFarms = data;
    });
  }

  getFields(){
    this.fieldProvider.getAll().subscribe((data:FieldModel[])=>{
      this.fields = data;
      this.filteredFields = data;
    });
  }

  getActivities(){
    this.activityTypesProvider.getAll().subscribe((data:ActivityTypeModel[])=>{
      this.activity_types = data;
    });
  }

  getUnities(){
    this.unityProvider.getAll().subscribe((data:UnityModel[])=>{
      this.unities = data;
    });
  }

  getCrops(){
    this.cropProvider.getAll().subscribe((data:CropModel[])=>{
      this.crops = data;
      this.filteredCrops = data;
    })
  }

  getActivity(){
    this.activity = this.navParams.get('activity');
    if(!this.activity){
      this.activity={};
      this.activityProvider.get(this.navParams.get('activity_id')).subscribe((data)=>{
        this.activity = data;
        this.activity_type = <ActivityTypeModel>this.getItenInArray((<ActivityModel>data).activity_type.id,this.activity_types);
        this.activity.crop_id = (<ActivityModel>data).crop.id;
        if(typeof this.activity.operation_date == 'string'){
          this.activity.operation_date = this.activity.operation_date.split(' ')[0];
        }
        if(typeof this.activity.payment_date == 'string'){
          this.activity.payment_date = this.activity.payment_date.split(' ')[0];
        }
        this.CropSelected();
        console.log(this.activity);
      })
    }
  }

  Update(){
    this.message.Wait()
    this.activityProvider.update(this.activity).subscribe((data)=>{
      this.message.SuccessAlert('Sucesso, atividade alterada!');
    },(err)=>{
      this.message.ErrorAlert();
    })
  }

  CalculateIten(){
    if(this.activity_type && this.activity.crop_id){
      let crop = <CropModel>this.getItenInArray(this.activity.crop_id,this.crops);
      console.log(this.activity);
      let activityType = this.activity_type;
      this.activity.quantity = this.activity.dose * crop.field.area;
      this.activity.total_value = (this.unity_value * this.activity.quantity);
      this.activity.value_per_ha = this.activity.total_value / crop.field.area;

      this.activity.quantity = Math.round(this.activity.quantity);
      this.activity.total_value = Math.round(this.activity.total_value*1000)/1000;
      this.activity.value_per_ha = Math.round(this.activity.value_per_ha*1000)/1000;
      this.activity.dose = Math.round(this.activity.dose*1000)/1000;
    }
  }

  ClientSelected(){
    this.farm = undefined;
    this.field = undefined;
    this.activity.crop_id = undefined;
    this.filteredFarms = this.farms.filter((farm)=>{
      return farm.client.id == this.client.id;
    });
    this.filteredFields = this.fields.filter((field)=>{
      return field.farm.client.id == this.client.id;
    });
    this.filteredCrops = this.crops.filter((crop)=>{
      crop.field.farm.client.id == this.client.id;
    });
  }

  getItenInArray(id:number,array:Array<{id:number}>){
    for (let i = 0; i < array.length; i++) {
        if(array[i].id==id){
          return array[i];
        }
    }
    return null;
  }

  FarmSelected(){
    this.client = <ClientModel>this.getItenInArray(this.farm.client.id,this.clients);
    this.filteredFields = this.fields.filter((field)=>{
      return field.farm.id == this.farm.id;
    });
    this.filteredCrops = this.crops.filter((crop)=>{
      crop.field.farm.id == this.farm.id;
    });
  }

  FieldSelected(){
    this.client = <ClientModel>this.getItenInArray(this.field.farm.client.id,this.clients);
    this.farm = <FarmModel>this.getItenInArray(this.field.farm.id,this.farms);
    this.filteredCrops = this.crops.filter((crop)=>{
      crop.field.id == this.field.id;
    });
  }

  CropSelected(){
    let crop = <CropModel>this.getItenInArray(this.activity.crop_id,this.crops);
    if(crop){
      this.field = <FieldModel>this.getItenInArray(crop.field.id,this.fields);
      this.farm = <FarmModel>this.getItenInArray(crop.field.farm.id,this.farms);
      this.client = <ClientModel>this.getItenInArray(crop.field.farm.client.id,this.clients);
    }
  }

  TypeSelected(){
    this.activity.activity_type_id = this.activity_type.id.toString();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityEditPage');
    this.getClients();
    this.getFarms();
    this.getFields();
    this.getCrops();
    this.getActivities();
    this.getUnities();
    this.getActivity();
  }

}
