import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SelectSearchableComponent } from 'ionic-select-searchable';
import { BasePage } from "../base/base";
import { CropModel } from '../../model/crop.model';
import { CropProvider } from '../../providers/crop/crop';
import { ActivityTypeProvider } from '../../providers/activity-type/activity-type';
import { ActivityProvider } from '../../providers/activity/activity';
import { UnityProvider } from '../../providers/unity/unity';
import { MessagesProvider } from '../../providers/messages/messages';
import { CurrenciesProvider } from '../../providers/currencies/currencies';

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
  activityType;
  unities;
  currencies;
  ports;

  constructor(
    public navCtrl:NavController,
    private params:NavParams,
    private cropProvider:CropProvider,
    private activityTypeProvider:ActivityTypeProvider,
    private activityProvider:ActivityProvider,
    private unityProvider:UnityProvider,
    private message:MessagesProvider,
    private currenciesProvider:CurrenciesProvider
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
    this.getCurrencies();
  }

  selectedActivityType(activity){
    if(activity.value){
      this.activity.activity_type_id = activity.value.id;
    }else this.activity.activity_type_id = null;
  }

  showError(){
    this.message.Wait();
    this.message.ErrorAlert();
  }

  searchActivities(event: {
    component: SelectSearchableComponent,
    text: string
  }){
    let text = (event.text || '').trim().toLowerCase();

    event.component.isSearching = true;
    event.component.items = this.activityTypes.filter(item=>{
      if(item.name&&item.group_id){
        return item.name.toLowerCase().indexOf(text.toLowerCase()) !== -1 || item.group_id.toLowerCase().indexOf(text.toLowerCase()) !== -1 || item.group.name.toLowerCase().indexOf(text.toLowerCase()) !==-1;
      }
      return false;
    });
    event.component.isSearching = false;
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
          try {
              if (!isNaN(Number(response.id)) && response.id != null) {
                  this.message.SuccessAlert('Atividade Cadastrada com sucesso!');
                  this.clearForm();
              } else {
                  console.log('ELSE: ' + isNaN(Number(response.id)) + ' - ' + response.id);
                  this.message.ErrorAlert();
              }
          } catch(err) {
              console.log("Erro: " + err);
              this.message.ErrorAlert();
          }
      },(err)=>{
          console.log("Err: " + err);
        this.message.ErrorAlert();
      }
    );
  }

  clearForm() {
      this.activityType = null;
      this.activity.activity_type_id = null;
      this.activity.unity_id = null;
      this.activity.product_name = null;
      this.activity.unity_value = null;
      this.activity.dose = null;
      this.activity.quantity = null;
      this.activity.total_value = null;
      this.activity.operation_date = null;
      this.activity.payment_date = null;
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

  getCurrencies(){
    this.currenciesProvider.getAll().subscribe(
      (response)=>{
        this.currencies = response;
        console.log(response);
      },(err)=>{

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
        console.log(response);
        this.activityTypes = response;
        this.ports = response;
      },(err)=>{
        this.navCtrl.setRoot('LoginPage');
      }
    );
  }

}
