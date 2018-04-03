import { Component,ViewChildren } from '@angular/core';
import { NgModel } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivityTypeInterface,ActivityTypeModel } from '../../model/activityType.model';
import { ActivityTypeProvider } from '../../providers/activity-type/activity-type';
import { MessagesProvider } from '../../providers/messages/messages';
import { BasePage } from "../base/base";
import { UnityProvider } from '../../providers/unity/unity';
import { UnityModel } from '../../model/unity.model';

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
  value_per_ha:string;
  @ViewChildren(NgModel) models:NgModel[];
  unities:UnityModel[]=[];

  private _valuePerHa:string='';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private acitivityTypeProvider:ActivityTypeProvider,
    private message:MessagesProvider,
    private unityProvider:UnityProvider,
  ){
    super(navCtrl);

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

  onValuePerHaChange($event:any){
    let value:string = $event;
    value = value.replace(/(?=[^,])(\D)+/gi,'');
    setTimeout(()=>{
      this.value_per_ha = value.length>0 ? 'R$ '+value: '';
    },0);
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
      this.value_per_ha = '';
      this.unity_value = '';
    })
  }

  blur(event){
    console.log(event);
  }

}
