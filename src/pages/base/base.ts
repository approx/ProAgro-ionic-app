import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { MyApp } from "../../app/app.component";
import { LoginPage } from "../login/login";


/**
 * Generated class for the BasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-base',
  templateUrl: 'base.html',
})
export class BasePage {

  constructor(public navCtrl: NavController) {
  }

  ionViewCanEnter(): boolean{
    if(MyApp.instance.loged){
      return true;
    }else{
      this.navCtrl.push(LoginPage.name);
    }
  }

}
