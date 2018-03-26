import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { BasePage } from "../base/base";

/**
 * Generated class for the ClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client',
  templateUrl: 'client.html',
})
export class ClientPage extends BasePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    super(navCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientPage');
  }

}
