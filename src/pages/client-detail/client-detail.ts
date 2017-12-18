import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClientModel } from '../../model/client.model';
import { MyApp } from '../../app/app.component';

/**
 * Generated class for the ClientDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client-detail',
  templateUrl: 'client-detail.html',
})
export class ClientDetailPage {
  client:ClientModel;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.client = navParams.get('client');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientDetailPage');
  }

  ionViewCanEnter(): boolean{
    return MyApp.instance.loged;
  }

}
