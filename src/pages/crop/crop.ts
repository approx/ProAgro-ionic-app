import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BasePage } from "../base/base";

/**
 * Generated class for the CropPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crop',
  templateUrl: 'crop.html',
})
export class CropPage extends BasePage{

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    super(navCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CropPage');
  }

}
