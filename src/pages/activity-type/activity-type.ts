import { Component,ViewChildren } from '@angular/core';
import { NgModel } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivityTypeInterface,ActivityTypeModel } from '../../model/activityType.model';
import { ActivityTypeProvider } from '../../providers/activity-type/activity-type';
import { BasePage } from "../base/base";
import { UnityProvider } from '../../providers/unity/unity';
import { UnityModel } from '../../model/unity.model';
import { MyApp } from '../../app/app.component';
import { ActivityListPage } from '../../pages/activity-list/activity-list';

/**
 * Generated class for the ActivityTypePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activity-type',
  templateUrl: 'activity-type.html',
})
export class ActivityTypePage extends BasePage{

  activityType:ActivityTypeInterface={
  };
  activityTypes:ActivityTypeModel[];
  unity_value:string;
  @ViewChildren(NgModel) models:NgModel[];
  unities:UnityModel[]=[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private acitivityTypeProvider:ActivityTypeProvider,
    private unityProvider:UnityProvider,
  ){
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

  getActivityTypes(){
    this.acitivityTypeProvider.getAll().subscribe((data:ActivityTypeModel[])=>{
      console.log(data);
      this.activityTypes = data;
    },(err)=>{

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityTypePage');
    console.log(this.models);
    this.getActivityTypes();
    this.getUnities();
  }

  getUnities(){
    this.unityProvider.getAll().subscribe((data:UnityModel[])=>{
      this.unities = data;
    });
  }

  onUnityValueChange($event:any){
    let value:string = $event;
    value = value.replace(/(?=[^,])(\D)+/gi,'');
    setTimeout(()=>{
      this.unity_value = value.length>0 ? 'R$ '+value: '';
    },0);
  }

  delete(id){
    this.acitivityTypeProvider.delete(id).subscribe((data)=>{
      this.getActivityTypes();
    })
  }

  Register(){
    this.acitivityTypeProvider.post(this.activityType).subscribe((data)=>{
      this.getActivityTypes();
      this.activityType = {
        name: '',
        id:''
      };
      this.unity_value = '';
    })
  }

  blur(event){
    console.log(event);
  }

}
