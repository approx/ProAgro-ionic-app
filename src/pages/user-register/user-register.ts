import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserRegisterProvider } from "../../providers/user-register/user-register";
import { MessagesProvider } from "../../providers/messages/messages";
import { BasePage } from "../base/base";
import { RolesProvider } from '../../providers/roles/roles';
import { MyApp } from '../../app/app.component';
import { FarmListPage } from '../../pages/farm-list/farm-list';

/**
 * Generated class for the UserRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment:'user/register'
})
@Component({
  selector: 'page-user-register',
  templateUrl: 'user-register.html',
})
export class UserRegisterPage extends BasePage{

  name:string;
  email:string;
  role_id:number;
  roles:any;
  client_id:number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userRegisterProvider:UserRegisterProvider,private message:MessagesProvider,private rolesProvider:RolesProvider) {
    super(navCtrl);
    this.getRoles();
  }

  ionViewWillEnter(){
    if (MyApp.instance.user.role.id == 3) {
      console.log('sem permissão');
      this.navCtrl.push(FarmListPage.name)
      //window.history.back();
    } else {
      console.log('user passou: ' + MyApp.instance.user.role.id);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserRegisterPage');
  }

  getRoles(){
    this.rolesProvider.getAll().subscribe((response)=>{
      console.log(response);
      for (let i = 0; i < response.length; i++) {
          if(3==response[i].id){
            response.splice(i,1);
          }
      }
      this.roles = response;
      console.log('Roles: ', this.roles);
    });
  }

  public GiveAcesss() {
    this.message.Wait();
    this.client_id = 0;
    this.userRegisterProvider.acess(this.name,this.email,this.role_id,this.client_id).subscribe((data)=>{
      this.message.SuccessAlert('Acesso concedido com sucesso, foi enviado um e-mail para o usuario terminar o cadastro!');
    },(err)=>{
      this.message.ErrorAlert();
    });
  }

}
