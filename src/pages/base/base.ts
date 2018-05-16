import { Component } from '@angular/core';
import { IonicPage, NavController,App } from 'ionic-angular';
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

  ionViewCanEnter(){
    if(MyApp.instance.loged){
      console.log('loged');
      return true;
    }else{
      setTimeout(()=>{
        this.navCtrl.setRoot(LoginPage.name);
      }, 0);
      console.log('not loged');
      // this.navCtrl.setRoot(LoginPage.name);
      return false;
    }
  }

}
