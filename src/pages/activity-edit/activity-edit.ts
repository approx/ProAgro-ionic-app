import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivityProvider } from '../../providers/activity/activity';
import { FarmProvider } from '../../providers/farm/farm';
import { FieldProvider } from '../../providers/field/field';
import { CropProvider } from '../../providers/crop/crop';
import { FarmModel } from '../../model/farm.model';
import { FieldModel } from '../../model/field.model';
import { CropModel } from '../../model/crop.model';
import { ActivityInterface } from '../../model/activity.model';
import { ActivityModel } from '../../model/activity.model';
import { ActivityTypeProvider } from '../../providers/activity-type/activity-type';
import { ActivityTypeModel } from '../../model/activityType.model';
import { UnityProvider } from '../../providers/unity/unity';
import { UnityModel } from '../../model/unity.model';
import { MessagesProvider } from '../../providers/messages/messages';
import { BasePage } from "../base/base";
// import { ActivityIten } from '../activity-register/activity-register';
import { SelectSearchableComponent } from 'ionic-select-searchable';
import { MyApp } from '../../app/app.component';
import { ActivityListPage } from '../../pages/activity-list/activity-list';

/**
 * Generated class for the ActivityEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 export interface ActivityIten{
   crop:CropModel;
   percentage:number;
   quantity:number;
   value_per_ha:number;
   dose:number;
   total:number;
 }

 @IonicPage({
   segment:'activity/:activity_id/edit'
 })
@Component({
  selector: 'page-activity-edit',
  templateUrl: 'activity-edit.html',
})
export class ActivityEditPage extends BasePage {
  activity:ActivityInterface={};
  farms:FarmModel[]=[];
  fields:FieldModel[]=[];
  filteredFields:FieldModel[]=[];
  crops:CropModel[]=[];
  filteredCrops:CropModel[]=[];
  activityTypes:ActivityTypeModel[]=[];
  activity_type:ActivityTypeModel;
  field:FieldModel;
  unities:UnityModel[]=[];
  maxDate:string;
  totalDose;
  farm:FarmModel;
  crop:CropModel;
  unity_value:string='';
  quantity:string='';
  value_per_ha:string='';
  total_value:string='';
  cropsRegister:ActivityIten[]=[];
  activityType:string;
  activityUpdate;
  activityTypeSelect;

  sended=0;
  totalToSend;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private activityProvider:ActivityProvider,
    private farmProvider:FarmProvider,
    private fieldProvider:FieldProvider,
    private cropProvider:CropProvider,
    private typesProvider:ActivityTypeProvider,
    private unityProvider:UnityProvider,
    private message:MessagesProvider
  ) {
    super(navCtrl);
    MyApp.instance.user;
  }

  portChange(event: { component: SelectSearchableComponent, value: any }) {
    if (event.value != null) {
      this.activity_type = event.value;
      this.selectActivity(event.value);
    } else {
      this.activity_type = null;
    }
    console.log('port:', event.value);
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

  selectActivity(activity:ActivityTypeModel){
    this.Calculate();
    console.log('foi');
    console.log(activity);
    this.activity.activity_type_id = activity.id.toString();
    this.activity.unity_id = activity.unity_id;
  }

  cropCalculatePercentage(){
    for (let i = 0; i < this.cropsRegister.length; i++) {
      this.cropsRegister[i].percentage = Math.round(100/this.cropsRegister.length);
    }
  }

  remove(iten:ActivityIten){
    this.cropsRegister.splice(this.cropsRegister.indexOf(iten),1);
    this.cropCalculatePercentage();
    this.cleanFields();
    this.Calculate();
  }

  haveCrop(crop):boolean{
    for (let i = 0; i < this.cropsRegister.length; i++) {
        if(this.cropsRegister[i].crop.id == crop.id){
          return true;
        }
    }

    return false;
  }

  changedIten(iten){
    this.Calculate();
  }

  Update(){
    this.activityUpdate = {
      id:this.activity.id,
      activity_type_id:this.activity_type.id.toString(),
      dose:this.activity.dose,
      unity_id:this.activity.unity_id,
      operation_date:this.activity.operation_date,
      payment_date: this.activity.payment_date,
      product_name: this.activity.product_name,
      quantity: this.activity.quantity,
      total_value: this.activity.total_value,
      value_per_ha: this.activity.value_per_ha,
      crop_id : this.crop.id
    }
    console.log('Update: ', this.activityUpdate);
    this.message.Wait();
    this.activityProvider.update(this.activityUpdate).subscribe((data)=>{
      this.message.SuccessAlert('Sucesso, atividade alterada!');
      this.navCtrl.push('CropDetailPage',{crop_id:this.activity.crop_id})
    },(err)=>{
      this.message.ErrorAlert();
    })
  }

  Calculate(){
    console.log('calculate');

    if(this.activity.activity_type_id && this.field){
      this.activity.quantity = this.activity.dose * this.field.area;
      console.log(this.field.area);
      this.activity.total_value = (parseFloat(this.unity_value) * this.activity.quantity);
      this.activity.value_per_ha = this.activity.total_value / this.field.area;

      this.activity.quantity = parseFloat(this.activity.quantity.toFixed(2));
      this.activity.total_value = parseFloat(this.activity.total_value.toFixed(2));
      this.activity.value_per_ha = Math.round(this.activity.value_per_ha*1000)/1000;
      this.activity.dose = Math.round(this.activity.dose*1000)/1000;
    } else {
      console.log('não calculou item')
    }
  }

  cleanFields(){
    setTimeout(()=>{
      this.farm = null;
      this.field = null;
      this.crop = null;
    },0)
    console.log('cleanFields')
  }

  getActivityType(id):ActivityTypeModel{
    for (let i = 0; i < this.activityTypes.length; i++) {
        if(this.activityTypes[i].id==id){
          return this.activityTypes[i];
        }
    }
    return null;
  }

  filterFarm(farm){
    let fieldsF:FieldModel[]=this.fields;

    this.filteredFields = fieldsF.filter((field)=>{
      if(field.farm.id == farm.id){
        return true;
      }
      return false;
    });
    this.field = null;
    this.filteredCrops = this.crops.filter((crop)=>{
      if(crop.field.farm.id == farm.id){
        return true;
      }
      return false;
    });
  }

  filterFields(field){
    this.filteredCrops = this.crops.filter((crop)=>{
      if(crop.field.id == field.id){
        return true;
      }
      return false;
    });
  }

  ionViewWillEnter(){
    if (MyApp.instance.user.role.id == 3) {
      console.log('sem permissão');
      this.navCtrl.push(ActivityListPage.name)
      //window.history.back();
    } else {
      console.log('user passou: ' + MyApp.instance.user.role.id);
    }
  }

  ionViewDidLoad() {
    if (MyApp.instance.user.role.id != 3) {
      console.log('ionViewDidLoad ActivityEditPage');
      this.message.Wait('Buscando Dados...');
      let date = new Date();
      date.setFullYear(date.getFullYear()+10);
      this.maxDate = date.getFullYear()+'-12-31';
      console.log(MyApp.instance.user);

      this.getFarms();
    }
  }

  getFarms(){
    this.farmProvider.getAll().subscribe((data:FarmModel[])=>{
      this.farms = data;
      console.log('getFarms');
      this.getFields();
    })
  }

  getFields(){

    this.fieldProvider.getAll().subscribe((data:FieldModel[])=>{
      this.fields = data;
      this.filteredFields = data;
      console.log("getFields")
      this.getCrops();
    })
  }

  getCrops(){
    this.cropProvider.getAll().subscribe((data:CropModel[])=>{
      this.crops = data;
      this.filteredCrops = data;
      console.log('getCrops');
      this.getUnities();
    })
  }

  getUnities(){
    this.unityProvider.getAll().subscribe((data:UnityModel[])=>{
      this.unities = data;
      console.log('getUnities');
      this.getTypes();
    });
  }

  getTypes(){
    this.typesProvider.getAll().subscribe((data:ActivityTypeModel[])=>{
      this.activityTypes = data;
      this.activityType = '';
      for (var i = 0; i < this.activityTypes.length; i++) {
        this.activityTypes[i].name = this.activityTypes[i].id + ' ' + this.activityTypes[i].name;
      }
      console.log('getTypes');
      this.getActivity();
    })
  }

  formatNumber(number:string|number,zerosLeft:number){
    if(number.toString().length>=zerosLeft){
      return number;
    }
    return this.formatNumber('0'+number,zerosLeft);
  }

  formatDate(dateString){
    let date=new Date(dateString);
    let payment_date = new Date(<string>this.activity.payment_date);

    return this.formatNumber(date.getDate(),2)+'/'+this.formatNumber(date.getMonth()+1,2)+'/'+date.getFullYear();
  }

  getActivity(){
    console.log('!activity');
    this.activity={};
    console.log('get acitivity por id');
    this.activityProvider.get(this.navParams.get('activity_id')).subscribe((data)=>{
      this.activity = data;
      console.log(data);
      this.activity.operation_date = this.formatDate(this.activity.operation_date);
      if(this.activity.quantity){
        this.activity.unity_value = this.activity.total_value/this.activity.quantity;
      }
      this.activity.payment_date = this.formatDate(this.activity.payment_date);
      this.processActivity();
    })
  }

  processActivity() {
    this.activity_type = <ActivityTypeModel>this.getItenInArray((<ActivityModel>this.activity).activity_type.id,this.activityTypes);
    this.activityTypeSelect = this.activity_type;
    console.log("Activity: ", this.activity);
    console.log("Cálculo: " + this.activity.total_value + " / " + this.activity.quantity);

    this.unity_value = (this.activity.total_value / this.activity.quantity).toFixed(2);
    this.activity.crop_id = (<ActivityModel>this.activity).crop.id;
    if(typeof this.activity.operation_date == 'string'){
      this.activity.operation_date = this.activity.operation_date.split(' ')[0];
    }
    if(typeof this.activity.payment_date == 'string'){
      this.activity.payment_date = this.activity.payment_date.split(' ')[0];
    }

    this.crop = <CropModel>this.getItenInArray((<ActivityModel>this.activity).crop.id,this.crops);
    this.field = <FieldModel>this.getItenInArray((<ActivityModel>this.activity).crop.field.id,this.fields);
    this.farm = <FarmModel>this.getItenInArray((<ActivityModel>this.activity).crop.field.farm.id,this.farms);

    console.log(this.activity);
    console.log(this.crop);
    console.log(this.crops);
    console.log(this.field);
    console.log(this.fields);
    console.log(this.farm);
    console.log(this.farms);

    this.message.Done();
  }

  getItenInArray(id:any,array:any){
    for (let i = 0; i < array.length; i++) {
        if(array[i].id==id){
          return array[i];
        }
    }
    return null;
  }

  calculateTotal(){
    if( this.activity.unity_value && this.activity.dose ){
      this.activity.quantity = this.activity.dose * this.crop.field.area;
      this.activity.total_value = this.activity.unity_value*this.activity.quantity;
    }
  }

  FarmSelected(){
    this.filteredFields = this.fields.filter((field)=>{
      return field.farm.id == this.farm.id;
    });
    this.filteredCrops = this.crops.filter((crop)=>{
      crop.field.farm.id == this.farm.id;
    });
  }

  FieldSelected(){
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
    }
  }

  TypeSelected(){
    this.activity.activity_type_id = this.activity_type.id.toString();
  }

}
