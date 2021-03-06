import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider} from '../../providers/auth/auth';
import { MyApp } from '../../app/app.component';
import { MessagesProvider } from "../../providers/messages/messages";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, private messages:MessagesProvider) {

  }

  ionViewWillEnter() {
    console.log('ionViewWill?Enter LoginPage');
  }

  ionViewDidEnter() {
    MyApp.instance.loged=false;
    console.log('ionViewDidLoad LoginPage');
    this.auth.LogOut();
  }

  LogIn():void {
    this.messages.Wait('Entrando...');
    let login = MyApp.instance.LogIn(this.cpf,this.password);
    if(login!=null){
      login.then(()=>{
        console.log("ok");
        this.messages.Done();
      }).catch((error)=>{
        console.log(error);
        if(error.status==401){
          this.messages.ErrorAlert("Credenciais incorretas, por favor verifique se o cpf/email e a senha foram digitados corretamentes.");
        }
        else{
          this.messages.ErrorAlert();
        }
        this.password="";
      });
    }
  }

}
