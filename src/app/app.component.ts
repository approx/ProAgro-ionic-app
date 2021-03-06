import { Component,ViewChild } from '@angular/core';
import { Platform,Nav,MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ClientListPage } from '../pages/client-list/client-list';
import { ClientRegisterPage } from '../pages/client-register/client-register';
import { NavBarPageInterface} from '../components/nav-bar/nav-bar';
import { AuthProvider} from '../providers/auth/auth';
import { CookieProvider } from "../providers/cookie/cookie";
import { HttpClient  } from '@angular/common/http';
import { endPoint } from "../Env";
import { UserModel } from "../model/user.model";
import { FarmListPage } from "../pages/farm-list/farm-list";
import { FarmRegisterPage } from "../pages/farm-register/farm-register";
import { CulturePage } from "../pages/culture/culture";
import { FieldListPage } from '../pages/field-list/field-list';
import { FieldRegisterPage } from '../pages/field-register/field-register';
import { CropListPage } from '../pages/crop-list/crop-list';
import { CropRegisterPage } from '../pages/crop-register/crop-register';
import { UserRegisterPage } from "../pages/user-register/user-register";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = ClientListPage.name;

  version = '1.8.17';

  loged:boolean = false;
  user:UserModel;

  pages:NavBarPageInterface[] = [
    {
      name:'Clientes',
      icon:'people',
      component:ClientListPage,
      itensToogle:false,
      role:'master|employe',
      render:false,
      itens:[
        {
          name:'Listar',
          component:ClientListPage,
          role:'master|employe',
          render:false,
          itensToogle:false
        },
        {
          name:'Cadastrar',
          component:ClientRegisterPage,
          role:'master|employe',
          render:false,
          itensToogle:false
        }
      ]
    },
    {
      name:'Fazendas',
      icon:'flag',
      component:FarmListPage,
      role:'master|employe',
      render:false,
      itensToogle:false,
      itens:[
        {
          name:'Listar',
          component:FarmListPage,
          role:'master|employe|client',
          render:false,
          itensToogle:false
        },
        {
          name:'Cadastrar',
          component:FarmRegisterPage,
          role:'master|employe',
          render:false,
          itensToogle:false
        },
        {
          name:'Culturas',
          component:CulturePage,
          role:'master|employe',
          render:false,
          itensToogle:false
        }
      ]
    },
    {
      name:'Talhões',
      icon:'grid',
      component:FieldListPage,
      role:'master|employe',
      render:false,
      itensToogle:false,
      itens:[
        {
          name:'Listar',
          component:FieldListPage,
          role:'master|employe|client',
          render:false,
          itensToogle:false
        },
        {
          name:'Cadastrar',
          component:FieldRegisterPage,
          role:'master|employe',
          render:false,
          itensToogle:false
        }
      ]
    },
    {
      name:'Safras',
      icon:'leaf',
      component:CropListPage,
      role:'master|employe',
      render:false,
      itensToogle:false,
      itens:[
        {
          name:'Listar',
          component:CropListPage,
          role:'master|employe|client',
          render:false,
          itensToogle:false
        },
        {
          name:'Cadastrar',
          component:CropRegisterPage,
          role:'master|employe',
          render:false,
          itensToogle:false
        },
        {
          name:'Culturas',
          component:CulturePage,
          role:'master|employe',
          render:false,
          itensToogle:false
        }
      ]
    },
    // {
    //   name:'Atividades',
    //   icon:'clipboard',
    //   component:ActivityListPage,
    //   role:'master|employe',
    //   render:false,
    //   itensToogle:false,
    //   itens:[
    //     {
    //       name:'Listar',
    //       component:ActivityListPage,
    //       role:'master|employe|client',
    //       render:false,
    //       itensToogle:false
    //     },
    //     {
    //       name:'Cadastrar por ha',
    //       component:ActivityRegisterPage,
    //       role:'master|employe',
    //       render:false,
    //       itensToogle:false
    //     },
    //     {
    //       name:'Cadastrar por valor total',
    //       component:ActivityRegisterTotalPage,
    //       role:'master|employe',
    //       render:false,
    //       itensToogle:false
    //     },
    //     {
    //       name:'Estoque',
    //       component:StockUsePage,
    //       role:'master|employe',
    //       render:false,
    //       itensToogle:false
    //     },
    //     {
    //       name:'Tipos',
    //       component:ActivityTypePage,
    //       role:'master|employe',
    //       render:false,
    //       itensToogle:false
    //     },
    //     {
    //       name:'Unidades',
    //       component:UnityPage,
    //       role:'master|employe',
    //       render:false,
    //       itensToogle:false
    //     }
    //   ]
    // },
    {
      name:'Usuarios',
      icon:'clipboard',
      component:UserRegisterPage,
      role:'master',
      render:false,
      itensToogle:false,
      itens:[
        {
          name:'Cadastrar',
          component:UserRegisterPage,
          role:'master',
          render:false,
          itensToogle:false
        }
      ]
    }
  ]

  @ViewChild(Nav) nav: Nav;

  static instance:MyApp;

  mapLoaded:boolean=false;
  mapCallback:()=>void;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public auth:AuthProvider,
    public http:HttpClient,
    public cookie:CookieProvider,
    private menu:MenuController
  ) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    MyApp.instance=this;

    (<any>window).mapCallback = ()=>{
      this.mapLoaded = true;
      if(this.mapCallback){
        this.mapCallback();
      }
      console.log('map loaded');
    }
  }

  ngOnInit(){
    if(this.checkIfIsNewUserURL()){
      this.auth.LogOut();
    }
    if(this.auth.checkIfLogged()){
      MyApp.instance.loged=true;
      // this.nav.setRoot(DashBoardPage.name);
      MyApp.instance.getUserData();
    }
  }

  checkIfIsNewUserURL(){
    let url = document.URL.split('#')[1];
    if(!url) return false;
    return url.indexOf('/user/new/') !=-1;
  }

  openPage(page,event:MouseEvent){
    event.stopPropagation();
    event.preventDefault();
    console.log(event);
    this.menu.close();
    this.nav.push(page.name);
  }

  push(page:any,params?:any,opts?:any):Promise<any>{
    console.log(this.nav);
    return this.nav.push(page,params,opts);
  }

  pop(opts?:any):Promise<any>{
    return this.nav.pop(opts);
  }

  LogIn(cpf:string,password:string):Promise<any>|null{
    if(!this.loged){
      return new Promise<any>((resolve,reject)=>{
        this.auth.LogIn(cpf,password).then((result)=>{
        console.log(result);
        this.loged=true;
        this.getUserData().then(()=>{
          this.nav.setRoot(ClientListPage.name);
          resolve(result);
        }).catch(()=>{
          reject();
        });
      }).catch((error)=>{
        reject(error);
      });
    });
    }
    else{
      return null;
    }
  }

  private checkUserOnCookie():boolean{
    return this.cookie.objs.user!=undefined;
  }

  getUserData():Promise<any>{
    return new Promise((resolve,reject)=>{
      if(!this.checkUserOnCookie()){
        this.http.get(endPoint+'api/current_user').subscribe(
          (data:UserModel)=>{
            this.user = new UserModel(data.id,data.name,data.CPF,data.email,data.phone,data.role);
            console.log(this.user);
            this.cookie.set('user',this.user.getJson());
            resolve();
          },
          (err)=>{
            reject()
          }
        );
      }
      else{
        this.user = this.cookie.objs.user;
        resolve();
        // console.log(data);
        console.log('geted user data')
      }
    })
  }

}
