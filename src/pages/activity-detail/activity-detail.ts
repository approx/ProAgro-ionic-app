import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivityModel } from '../../model/activity.model';
import { ActivityProvider } from '../../providers/activity/activity';

/**
 * Generated class for the ActivityDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({segment:'activity/:activity_id'})
@Component({
  selector: 'page-activity-detail',
  templateUrl: 'activity-detail.html',
})
export class ActivityDetailPage {
  activity_id:number;
  activity:ActivityModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private activityProvider:ActivityProvider
  ) {
    this.activity_id = this.navParams.get('activity_id');
    this.activity = this.navParams.get('activity');

    if(this.activity_id && !this.activity){
      this.getActivity();
    }
  }

  getActivity(){
    this.activityProvider.get(this.activity_id).subscribe((data:ActivityModel)=>{
      this.activity = data;
      console.log(data);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityDetailPage');

  }
}
