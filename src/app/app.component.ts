import { Component,ViewChild } from '@angular/core';
import { Platform,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";
import { DashBoardPage } from "../pages/dash-board/dash-board";
import { ClientListPage } from '../pages/client-list/client-list';
import { ClientPage } from '../pages/client/client';
import { ClientRegisterPage } from '../pages/client-register/client-register';
import { AuthInterceptorProvider } from '../providers/auth-interceptor/auth-interceptor';
import { NavBarPageInterface} from '../components/nav-bar/nav-bar';
import { NgStyle,NgClass } from '@angular/common';
import { AuthProvider} from '../providers/auth/auth';
import { CookieProvider } from "../providers/cookie/cookie";
import { HttpClient  } from '@angular/common/http';
import { endPoint } from "../Env";
import { UserModel } from "../model/user.model";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  loged:boolean = false;
  user:UserModel;

  pages:NavBarPageInterface[] = [
    {name:'Client',icon:'pie',component:ClientPage,itensToogle:false,itens:[{name:'listar',component:ClientListPage,itensToogle:false},{name:'cadastrar',component:ClientRegisterPage,itensToogle:false}]},
    {name:'DashBoard',icon:'pie',component:DashBoardPage,itensToogle:false}

  ]

  @ViewChild(Nav) nav: Nav;

  static instance:MyApp;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public auth:AuthProvider,public http:HttpClient,public cookie:CookieProvider) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    MyApp.instance=this;
    if(this.auth.checkIfLogged()){
      console.log('redirected');
      this.loged=true;
      this.getUserData();
      // this.rootPage = DashBoardPage;
      this.rootPage = ClientRegisterPage;
    }
    else{
      console.log('not logged');
    }
  }

  push(page:any,params?:any,opts?:any):Promise<any>{
    return this.nav.push(page,params,opts);
  }

  pop(opts?:any):Promise<any>{
    return this.nav.pop(opts);
  }

  LogIn(cpf:string,password:string):Promise<any>|null{
    if(!this.loged){
      return this.auth.LogIn(cpf,password).then((result)=>{
        console.log(result);
        this.loged=true;
        this.nav.setRoot(DashBoardPage);
        this.getUserData();
      }).catch((error)=>{
        console.log(error);
      });
    }
    else{
      return null;
    }
  }

  private checkUserOnCookie():boolean{
    return this.cookie.objs.user!=undefined;
  }

  getUserData(){
    if(!this.checkUserOnCookie()){
      this.http.get(endPoint+'api/current_user').subscribe(
        (data:any)=>{
          this.user = new UserModel(this.http,data.id,data.name,data.CPF,data.email,data.phone);
          console.log(this.user.getJson());
          this.cookie.set('user',this.user.getJson());
        }
      );
    }
    else{
      this.user = this.cookie.objs.user;
      // console.log(data);
      console.log('geted user data')
    }
  }
}
