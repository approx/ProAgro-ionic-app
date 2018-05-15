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
import { ActivityTypeProvider } from '../../providers/activity-type/activity-type';
import { ActivityTypeModel } from '../../model/activityType.model';
import { UnityProvider } from '../../providers/unity/unity';
import { UnityModel } from '../../model/unity.model';
import { MessagesProvider } from '../../providers/messages/messages';
import { BasePage } from "../base/base";
import { SelectSearchable } from 'ionic-select-searchable';
import { MyApp } from '../../app/app.component';
import { ActivityListPage } from '../../pages/activity-list/activity-list';

/**
 * Generated class for the ActivityRegisterPage page.
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

@IonicPage()
@Component({
  selector: 'page-activity-register',
  templateUrl: 'activity-register.html',
})
export class ActivityRegisterPage extends BasePage{

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
  finished_crops:boolean=false;
  cropsRegister:ActivityIten[]=[];
  activityType:string;

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

  portChange(event: { component: SelectSearchable, value: any }) {
    if (event.value != null) {
      this.activity_type = event.value;
      this.selectActivity(event.value);
    } else {
      this.activity_type = null;
    }
    console.log('port:', event.value);
  }

  getUnities(){
    this.unityProvider.getAll().subscribe((data:UnityModel[])=>{
      this.unities = data;
    });
  }

  safraSelected(crop){
    this.addCrop(crop);
  }

  findIdInArray(id:number,array:{id:number}[]):{id:number}{
    for (let i = 0; i < array.length; i++) {
        if(id==array[i].id){
          return array[i];
        }
    }
    return null;
  }

  setParams(){
    let field:FieldModel = this.navParams.get('field');
    if(field){
      if(field.crop){
        this.addCrop(field.crop);
      }
    }

    let crop:CropModel = this.navParams.get('crop');
    if(crop){
      this.addCrop(crop);
    }
  }

  selectActivity(activity:ActivityTypeModel){
    this.Calculate();
    console.log('foi');
    console.log(activity);
    this.activity.activity_type_id = activity.id.toString();
    this.activity.unity_id = activity.unity_id;
  }

  addCrop(crop:CropModel){
    if(!this.haveCrop(crop)){
      this.cropsRegister.push({crop:crop,percentage:0,quantity:0,value_per_ha:0,total:0,dose:0});
      this.cropCalculatePercentage();
      this.cleanFilters();
      this.cleanFields();
      this.Calculate();
    }
    this.cleanFields();
  }

  cropCalculatePercentage(){
    for (let i = 0; i < this.cropsRegister.length; i++) {
      this.cropsRegister[i].percentage = Math.round(100/this.cropsRegister.length);
    }
  }

  remove(iten:ActivityIten){
    this.cropsRegister.splice(this.cropsRegister.indexOf(iten),1);
    this.cropCalculatePercentage();
    this.cleanFilters();
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

  Register(){
    this.sended = 0;
    this.totalToSend = this.cropsRegister.length;
    this.message.Wait();

    for (let i = 0; i < this.cropsRegister.length; i++) {
      this.activityProvider.save({
        activity_type_id:this.activity_type.id.toString(),
        dose:this.cropsRegister[i].dose,
        unity_id:this.activity.unity_id,
        operation_date:this.activity.operation_date,
        payment_date: this.activity.payment_date,
        product_name: this.activity.product_name,
        quantity: this.cropsRegister[i].quantity,
        total_value: this.cropsRegister[i].total,
        value_per_ha: this.cropsRegister[i].value_per_ha,
        crop_id : this.cropsRegister[i].crop.id
      }).subscribe((data)=>{
      this.sended++;
      if(this.sended==this.totalToSend){
        this.message.SuccessAlert('Atividades registradas com sucesso!');
        this.clearForm();
      }
      },(err)=>{
        this.message.ErrorAlert();
      })
    }
  }

  clearForm() {
    this.activity_type = null;
    this.activityTypeSelect = null;
    this.activity.product_name = '';
    this.activity.total_value = '';
    this.activity.dose = '';
    this.activity.unity_id = '';
    this.activity.operation_date = null;
    this.activity.payment_date = null;
    this.finished_crops = false;
    this.farm = null;
    this.field = null;
    this.crop = null;
    this.cropsRegister = [];
  }

  onlyFieldsNotFinished():FieldModel[]{
    this.filteredFields = this.fields.filter((field)=>{
      if(field.crop){
        let d = new Date(field.crop.final_date);
        let now = new Date();
        if(d.getTime()>now.getTime()){
          return true;
        }
      }
      return false;
    });

    return this.filteredFields;
  }

  Calculate(){
    for (let i = 0; i < this.cropsRegister.length; i++) {
        this.CalculateIten(this.cropsRegister[i]);
    }
    // this.cleanFields();
  }

  CalculateIten(iten:ActivityIten){
    if(this.activity.activity_type_id && iten.crop){
      console.log(iten);
      iten.quantity = ((iten.percentage/100) * this.activity.dose) * iten.crop.field.area;
      console.log(this.unity_value);
      iten.total = (parseFloat(this.unity_value) * iten.quantity);
      iten.value_per_ha = iten.total / iten.crop.field.area;
      iten.dose = (iten.percentage/100) * this.activity.dose;

      iten.quantity = Math.round(iten.quantity);
      iten.total = Math.round(iten.total*1000)/1000;
      iten.value_per_ha = Math.round(iten.value_per_ha*1000)/1000;
      iten.dose = Math.round(iten.dose*1000)/1000;

    }
  }

  cleanFilters(){
    if(this.finished_crops){
      this.filteredFields=this.fields;
    }
    else{
      this.onlyFieldsNotFinished();
    }
    this.filteredCrops = this.crops;
  }

  cleanFields(){
    setTimeout(()=>{
      this.farm = null;
      this.field = null;
      this.crop = null;
    },0)
    console.log('cleanFields')
  }

  calculateTotalDose(){
    if(this.activity.dose && this.field){
      this.totalDose = this.activity.dose * this.field.area;
      console.log('total dose calculated ' +this.totalDose );
    }
  }

  getFild(id):FieldModel{
    for (let i = 0; i < this.fields.length; i++) {
        if(this.fields[i].id==id){
          return this.fields[i];
        }
    }
    return null;
  }

  getCrop(id):CropModel{
    for (let i = 0; i < this.crops.length; i++) {
        if(this.crops[i].id==id){
          return this.crops[i];
        }
    }
    return null;
  }

  getFarm(id):FarmModel{
    for (let i = 0; i < this.farms.length; i++) {
        if(this.farms[i].id==id){
          return this.farms[i];
        }
    }
    return null;
  }

  getActivityType(id):ActivityTypeModel{
    for (let i = 0; i < this.activityTypes.length; i++) {
        if(this.activityTypes[i].id==id){
          return this.activityTypes[i];
        }
    }
    return null;
  }

  calculateValueAndQuantity(){
    if(this.totalDose && this.activity.activity_type_id && this.field){
      this.total_value = 'R$ '+(parseFloat(this.unity_value) * this.totalDose);
      this.quantity = this.totalDose;
      this.value_per_ha = 'R$ '+((parseFloat(this.unity_value) * this.totalDose) / this.field.area);
      console.log('Value and quantity calculated');
    }
  }

  getFarms(){
    this.farmProvider.getAll().subscribe((data:FarmModel[])=>{
      this.farms = data;
      console.log(data);
    })
  }

  getTypes(){
    this.typesProvider.getAll().subscribe((data:ActivityTypeModel[])=>{
      this.activityTypes = data;
      this.activityType = '';
      for (var i = 0; i < this.activityTypes.length; i++) {
        this.activityTypes[i].name = this.activityTypes[i].id + ' ' + this.activityTypes[i].name;
      }
    })
  }

  filterFarm(farm){
    let fieldsF:FieldModel[]=this.fields;
    if(!this.finished_crops){
      fieldsF = this.onlyFieldsNotFinished();
    }
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
    if(!this.finished_crops){
      this.addCrop(field.crop);
    }
    else{
      if(!this.farm){
        setTimeout(()=>{
          this.farm=this.getFarm(field.farm.id);
          console.log('changed Farm');
        },0)
      }
      this.filteredCrops = this.crops.filter((crop)=>{
        if(crop.field.id == field.id){
          return true;
        }
        return false;
      });
    }
  }

  getFields(){
    this.fieldProvider.getAll().subscribe((data:FieldModel[])=>{
      this.fields = data;
      console.log(data);
      this.filteredFields = data;
      this.onlyFieldsNotFinished();
    })
  }

  getCrops(){
    this.cropProvider.getAll().subscribe((data:CropModel[])=>{
      this.crops = data;
      this.filteredCrops = data;
      console.log(data);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityRegisterPage');
    let date = new Date();
    date.setFullYear(date.getFullYear()+10);
    this.maxDate = date.getFullYear()+'-12-31';

    this.getFarms();
    this.getFields();
    this.getCrops();
    this.getTypes();
    this.getUnities();
    this.setParams();
  }

}
