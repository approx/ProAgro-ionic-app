import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserRegisterProvider } from "../../providers/user-register/user-register";
import { MessagesProvider } from "../../providers/messages/messages";
import { LoginPage } from "../login/login";
import { ClientListPage } from '../client-list/client-list';
import { MyApp } from '../../app/app.component';
import { app_url } from '../../Env';

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
  user:any={};
  token:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public userRegisterProvider:UserRegisterProvider, private messages:MessagesProvider) {
  }

  Register(){
    this.messages.Wait();
    this.user.token = this.token.token;
    this.userRegisterProvider.register(this.user).subscribe((reponse)=>{
      this.messages.SuccessAlert('Registrado com sucesso!');
      this.navCtrl.push(LoginPage.name);
    },(err)=>{
      this.messages.ErrorAlert();
    });
  }

  ionViewDidLeave(){
  }

  ionViewCanEnter(){
   // here we can either return true or false
   // depending on if we want to leave this view
   return new Promise<void>((resolve,reject)=>{
    this.userRegisterProvider.validToken(this.navParams.get('token')).subscribe((token)=>{
      console.log(token);
      this.token = token;
      // this.navCtrl.push(LoginPage.name);
      resolve();
    },(err)=>{
      console.log(err);
      window.location.replace(app_url+'login');
      location.reload();
      reject();
    })
   });
  }

}
