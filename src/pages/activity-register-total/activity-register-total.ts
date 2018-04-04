import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivityTypeProvider } from '../../providers/activity-type/activity-type';
import { ActivityTypeModel,ActivityTypeInterface } from '../../model/activityType.model';
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
export class ActivityRegisterTotalPage {

  activityTypes:ActivityTypeModel[]=[];
  cropsRegister:ActivityIten[]=[];
  unity_value=undefined;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private typesProvider:ActivityTypeProvider,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityRegisterTotalPage');
    this.getTypes();
  }

  getTypes(){
    this.typesProvider.getAll().subscribe((data:ActivityTypeModel[])=>{
      this.activityTypes = data;
    })
  }

}
