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
import { ActivityTypeModel,ActivityTypeInterface } from '../../model/activityType.model';
import { UnityProvider } from '../../providers/unity/unity';
import { UnityModel } from '../../model/unity.model';
import { MessagesProvider } from '../../providers/messages/messages';
import { BasePage } from "../base/base";
import { ActivityIten } from '../activity-register/activity-register';

/**
 * Generated class for the ActivityRegisterTotalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activity-register-total',
  templateUrl: 'activity-register-total.html',
})
export class ActivityRegisterTotalPage extends BasePage {

  activityTypes:ActivityTypeModel[]=[];
  cropsRegister:ActivityIten[]=[];
  fields:FieldModel[]=[];
  filteredFields:FieldModel[]=[];
  crops:CropModel[]=[];
  filteredCrops:CropModel[]=[];
  farms:FarmModel[]=[];
  unity_value=undefined;
  unities:UnityModel[]=[];
  activity:ActivityInterface={};
  maxDate:string;

  farmSelected:number;
  fieldSelected:number;

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityRegisterTotalPage');
    this.getTypes();
    let date = new Date();
    date.setFullYear(date.getFullYear()+10);
    this.maxDate = date.getFullYear()+'-12-31';

    this.getFarms();
    this.getFields();
    this.getCrops();
    this.getUnities();
  }

  logForm(form){
    console.log(form);
  }

  filterFields(){
    this.filteredFields = this.fields.filter((field)=>{
      return field.farm.id == this.farmSelected;
    });
  }

  filterCropsByField(){
    this.filteredCrops = this.crops.filter((crop)=>{
      return crop.field.id == this.fieldSelected;
    });
  }

  filterCropsByFarm(){
    this.filteredCrops = this.crops.filter((crop)=>{
      return crop.field.farm.id == this.farmSelected;
    });
  }

  selectFarm(){
    this.filterFields();
    this.filterCropsByFarm();
  }

  getField(id:number):FieldModel{
    for (let i = 0; i < this.fields.length; i++) {
        if(this.fields[i].id == id) return this.fields[i];
    }
    return null;
  }

  getCrop(id:number):CropModel{
    for (let i = 0; i < this.crops.length; i++) {
        if(this.crops[i].id == id) return this.crops[i];
    }
  }

  selectCrop(){
    let crop = this.getCrop(this.activity.crop_id);
    this.fieldSelected = crop.field.id;
    this.farmSelected = crop.field.farm.id;
  }

  Register(){
    this.message.Wait();
    this.activityProvider.save(this.activity).subscribe((done)=>{
      this.message.SuccessAlert('Atividade registrada com sucesso!')
    },(err)=>{
      this.message.ErrorAlert();
    })
  }

  selectField(){
    this.farmSelected = this.getField(this.fieldSelected).farm.id;
    this.filterCropsByField();
  }

  getTypes(){
    this.typesProvider.getAll().subscribe((data:ActivityTypeModel[])=>{
      this.activityTypes = data;
    })
  }

  getFields(){
    this.fieldProvider.getAll().subscribe((data:FieldModel[])=>{
      this.fields = data;
      console.log(data);
      this.filteredFields = this.fields;
    })
  }

  getCrops(){
    this.cropProvider.getAll().subscribe((data:CropModel[])=>{
      this.crops = data;
      this.filteredCrops = data;
      console.log(data);
    })
  }

  getFarms(){
    this.farmProvider.getAll().subscribe((data:FarmModel[])=>{
      this.farms = data;
      console.log(data);
    })
  }

  getUnities(){
    this.unityProvider.getAll().subscribe((data:UnityModel[])=>{
      this.unities = data;
    });
  }

}
