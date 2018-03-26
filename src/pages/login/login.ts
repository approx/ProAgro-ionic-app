import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider} from '../../providers/auth/auth';
import { MyApp } from '../../app/app.component';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public password:string;
  public cpf:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider) {

  }

  ionViewDidLoad() {
    MyApp.instance.loged=false;
    this.auth.LogOut();
    console.log('ionViewDidLoad LoginPage');
  }

  LogIn():void {
    let login = MyApp.instance.LogIn(this.cpf,this.password);
    if(login!=null){
      login.catch((error)=>{
        this.password="";
      });
    }
  }

}
