import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SelectSearchable } from 'ionic-select-searchable';
import { BasePage } from "../base/base";
import { CropModel } from '../../model/crop.model';
import { CropProvider } from '../../providers/crop/crop';
import { ActivityTypeProvider } from '../../providers/activity-type/activity-type';
import { ActivityProvider } from '../../providers/activity/activity';
import { UnityProvider } from '../../providers/unity/unity';
import { MessagesProvider } from '../../providers/messages/messages';

/**
 * Generated class for the ActivityRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({segment:'crop/:crop_id/activity-register'})
@Component({
  selector: 'page-activity-register',
  templateUrl: 'activity-register.html',
})
export class ActivityRegisterPage extends BasePage{

  crop:CropModel;
  activity:any={};
  activityTypeId;
  activityTypes;
  unities;

  constructor(
    public navCtrl:NavController,
    private params:NavParams,
    private cropProvider:CropProvider,
    private activityTypeProvider:ActivityTypeProvider,
    private activityProvider:ActivityProvider,
    private unityProvider:UnityProvider,
    private message:MessagesProvider
  ){
    super(navCtrl);
  }

  ionViewDidEnter(){
    this.crop = this.params.get('crop');
    if(!this.crop){
      this.getCrop()
    }
    this.getActivityTypes();
    this.getUnities();
  }

  selectedActivityType(activity){
    if(activity.value){
      this.activity.activity_type_id = activity.value.id;
    }else this.activity.activity_type_id = null;
  }

  getCrop(){
    this.cropProvider.get(this.params.get('crop_id')).subscribe(
      (response)=>{
        this.crop = response;
      },(err)=>{
        this.navCtrl.setRoot('LoginPage');
      }
    );
  }

  Register(){
    this.message.Wait();
    this.activityProvider.save({...this.activity,crop_id:this.crop.id}).subscribe(
      (response)=>{
        this.message.SuccessAlert('Atividade Cadastrada com sucesso!');
      },(err)=>{
        this.message.ErrorAlert();
      }
    );
  }

  getUnities(){
    this.unityProvider.getAll().subscribe(
      (response)=>{
        this.unities = response;
      },(err)=>{
        this.navCtrl.setRoot('LoginPage');
      }
    );
  }

  calculateTotal(){
    if( this.activity.unity_value && this.activity.dose ){
      this.activity.quantity = this.activity.dose * this.crop.field.area;
      this.activity.total_value = this.activity.unity_value*this.activity.quantity;
    }
  }

  getActivityTypes(){
    this.activityTypeProvider.getAll().subscribe(
      (response)=>{
        this.activityTypes = response
      },(err)=>{
        this.navCtrl.setRoot('LoginPage');
      }
    );
  }

}
