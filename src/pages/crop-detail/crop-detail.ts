import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CropModel } from '../../model/crop.model';
import { CropProvider } from '../../providers/crop/crop';
import { ActivityRegisterPage } from '../../pages/activity-register/activity-register';
import { ActivityDetailPage } from '../../pages/activity-detail/activity-detail';

/**
 * Generated class for the CropDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({segment:'crop/:crop_id'})
@Component({
  selector: 'page-crop-detail',
  templateUrl: 'crop-detail.html',
})
export class CropDetailPage {

  crop:CropModel;
  crop_id:number;

  constructor(public navCtrl: NavController, public navParams: NavParams,private cropProvider:CropProvider) {
    this.crop_id = navParams.get('crop_id');
    this.crop = navParams.get('crop');
    console.log(this.crop)
  }

  openRegisterPage(event:MouseEvent){
    event.stopPropagation();
    event.preventDefault();
    this.navCtrl.push(ActivityRegisterPage.name,{crop:this.crop});
  }

  openActivityPage(activity){
    this.navCtrl.push(ActivityDetailPage.name,{activity_id:activity.id});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CropDetailPage');
    if(!this.crop&&this.crop_id){
      this.cropProvider.get(this.crop_id).subscribe((data:CropModel)=>{
        this.crop=data;
        console.log(this.crop);
      });
    }
  }

}
