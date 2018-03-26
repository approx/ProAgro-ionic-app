import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserRegisterProvider } from "../../providers/user-register/user-register";

/**
 * Generated class for the NewUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment:'user/new/:token'
})
@Component({
  selector: 'page-new-user',
  templateUrl: 'new-user.html',
})
export class NewUserPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public userRegisterProvider:UserRegisterProvider) {
  }

  ionViewCanEnter(){
   // here we can either return true or false
   // depending on if we want to leave this view
   return new Promise<void>((resolve,reject)=>{
    this.userRegisterProvider.validToken(this.navParams.get('token')).subscribe((data)=>{
      console.log('acepted');
      resolve();
    },(err)=>{
      console.log(err);
      console.log('rejected');
      reject();
    })
   });
  }

}
