import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivityProvider } from '../../providers/activity/activity';
import { ActivityModel } from '../../model/activity.model';
import { ActivityRegisterPage } from '../../pages/activity-register/activity-register';
import { ActivityDetailPage } from '../../pages/activity-detail/activity-detail';
import { FarmProvider } from '../../providers/farm/farm';
import { FarmModel } from '../../model/farm.model';
import { FieldProvider } from '../../providers/field/field';
import { FieldModel } from '../../model/field.model';
import { CropProvider } from '../../providers/crop/crop';
import { CropModel } from '../../model/crop.model';
import { ActivityTypeProvider } from '../../providers/activity-type/activity-type';
import { ActivityTypeModel } from '../../model/activityType.model';
import { UnityProvider } from '../../providers/unity/unity';
import { UnityModel } from '../../model/unity.model';
import { BasePage } from "../base/base";
import { MessagesProvider } from '../../providers/messages/messages';
import { ActivityEditPage } from "../activity-edit/activity-edit";
import { MyApp } from '../../app/app.component';

/**
 * Generated class for the ActivityListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({segment:"activity/list"})
@Component({
  selector: 'page-activity-list',
  templateUrl: 'activity-list.html',
})
export class ActivityListPage extends BasePage {

  activities:ActivityModel[]=[];

  filteredActivities:ActivityModel[]=[];

  farms:FarmModel[];
  farm:FarmModel[]=[];

  fields:FieldModel[];
  filteredFields:FieldModel[] = [];
  field:FieldModel[]=[];

  crops:CropModel[];
  filteredCrops:CropModel[] = [];
  crop:CropModel[]=[];

  activityTypes:ActivityTypeModel[];
  activityType:ActivityTypeModel[]=[];

  unities:UnityModel[];
  unity:UnityModel[]=[];

  loaded:boolean = false;
  userClient:boolean;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private activityProvider:ActivityProvider,
    private farmProvider:FarmProvider,
    private fieldProvider:FieldProvider,
    private cropProvider:CropProvider,
    private activityTypeProvider:ActivityTypeProvider,
    private uniyProvider:UnityProvider,
    private message:MessagesProvider
  ) {
    super(navCtrl);
    MyApp.instance.user;
    this.userClient = MyApp.instance.user.role.id == 3;
  }

  getActivities(){
    this.activityProvider.getAll().subscribe((data:ActivityModel[])=>{
      this.activities = data;
      this.filteredActivities = data;
      this.loaded = true;
    })
  }

  getFarms(){
    this.farmProvider.getAll().subscribe((data:FarmModel[])=>{
      this.farms = data;
    })
  }

  getFields(){
    this.fieldProvider.getAll().subscribe((data:FieldModel[])=>{
      this.fields = data;
      this.filteredFields = data;
    })
  }

  getCrops(){
    this.cropProvider.getAll().subscribe((data:CropModel[])=>{
      this.crops = data;
      this.filteredCrops = data;
    })
  }

  getActivityTypes(){
    this.activityTypeProvider.getAll().subscribe((data:ActivityTypeModel[])=>{
      this.activityTypes = data;
    })
  }

  getUnities(){
    this.uniyProvider.getAll().subscribe((data:UnityModel[])=>{
      this.unities = data;
    })
  }

  checkItenInArray(iten,array):boolean{
    if(array.length<=0){
      return true;
    }
    for (let i = 0; i < array.length; i++) {
        if(iten.id==array[i].id){
          return true;
        }
    }
    return false;
  }

  delete(activity:ActivityModel){
    this.message.ShowConfirmMessage('Deletar atividade','tem certeza que deseja deletar está atividade?',()=>{
      this.message.Wait();
      this.activityProvider.delete(activity.id).subscribe((response)=>{
        this.message.SuccessAlert('Atividade deletada com sucesso!',()=>{
          this.getActivities();
        });
      },(err)=>{
        this.message.ErrorAlert();
      })
    })
  }


  Filter(){
    this.filteredActivities = this.activities.filter((activity)=>{
      if(this.farm.length==0 || this.checkItenInArray(activity.crop.field.farm,this.farm)){
        if(this.field.length==0 || this.checkItenInArray(activity.crop.field,this.field)){
          if(this.crop.length==0 || this.checkItenInArray(activity.crop,this.crop)){
            if(this.activityType.length==0 || this.checkItenInArray(activity.activity_type,this.activityType)){
              if(this.unity.length==0 || this.checkItenInArray(activity.unity,this.unity)){
                return true;
              }
            }
          }
        }
      }
      return false;
    });
  }

  FilterFarm(){
    this.field = [];
    this.crop = [];
    this.filteredFields = this.fields.filter((field)=>{
      if(this.checkItenInArray(field.farm,this.farm)){
        return true;
      }
      return false;
    });
    this.filteredCrops = this.crops.filter((crop)=>{
      if(this.checkItenInArray(crop.field.farm,this.farm)){
        return true;
      }
      return false;
    })
    this.Filter();
  }

  getFarm(id):FarmModel{
    for (let i = 0; i < this.farms.length; i++) {
        if(this.farms[i].id == id){
          return this.farms[i];
        }
    }
    return null;
  }

  getField(id):FieldModel{
    for (let i = 0; i < this.fields.length; i++) {
        if(this.fields[i].id == id){
          return this.fields[i];
        }
    }
    return null;
  }

  FilterField(){
    this.crop = [];
    this.farm = [];
    for (let i = 0; i < this.field.length; i++) {
      let farm = this.getFarm(this.field[i].farm.id);
      if(farm && this.farm.indexOf(farm)==-1){
        this.farm.push(farm);
      }
    }
    this.filteredCrops = this.crops.filter((crop)=>{
      if(this.checkItenInArray(crop.field,this.field)){
        return true;
      }
      return false;
    })
    this.Filter();
  }

  FilterCrop(){
    this.farm=[];
    this.field=[];
    for (let i = 0; i < this.crop.length; i++) {
      let farm = this.getFarm(this.crop[i].field.farm.id);
      if(farm && this.farm.indexOf(farm)==-1){
        this.farm.push(farm);
      }
    }
    for (let i = 0; i < this.crop.length; i++) {
      let field = this.getField(this.crop[i].field.id);
      if(field && this.field.indexOf(field)==-1){
        this.field.push(field);
      }
    }
    this.Filter();
  }

  openRegisterPage(event:MouseEvent){
    event.preventDefault();
    event.stopPropagation();
    this.navCtrl.push(ActivityRegisterPage.name);
  }

  openActivityPage(activity:ActivityModel){
    this.navCtrl.push(ActivityDetailPage.name,{activity_id:activity.id,activity:activity});
  }

  openEditPage(event:MouseEvent,activity:ActivityModel){
    event.stopPropagation();
    event.preventDefault();
    this.navCtrl.push(ActivityEditPage.name,{activity:activity,activity_id:activity.id});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityListPage');
    this.getActivities();
    this.getFarms();
    this.getFields();
    this.getCrops();
    this.getActivityTypes();
    this.getUnities();
  }

}
