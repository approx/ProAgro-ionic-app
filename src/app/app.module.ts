import { BrowserModule } from '@angular/platform-browser';
// import { Http } from '@angular/http';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule } from '@angular/forms';

import { MyApp } from './app.component';

//Pipes
import { FilterPipe } from '../pipes/filter/filter';
//Pages
import { HomePage } from '../pages/home/home';
import { DashBoardPage } from '../pages/dash-board/dash-board';
import { LoginPage } from '../pages/login/login';
import { ClientPage } from '../pages/client/client';
import { ClientListPage } from '../pages/client-list/client-list';
import { ClientRegisterPage } from '../pages/client-register/client-register';
//Providers
import { AuthProvider } from '../providers/auth/auth';
import { CookieProvider } from '../providers/cookie/cookie';
//Components
import { NavBarComponent } from "../components/nav-bar/nav-bar";
import { UserComponent } from "../components/user/user";
import { AuthInterceptorProvider } from '../providers/auth-interceptor/auth-interceptor';
import { ClientProvider } from '../providers/client/client';
import { AddressProvider } from '../providers/address/address';
import { CityProvider } from '../providers/city/city';
import { StateProvider } from '../providers/state/state';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    DashBoardPage,
    NavBarComponent,
    UserComponent,
    ClientPage,
    ClientListPage,
    ClientRegisterPage,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    DashBoardPage,
    NavBarComponent,
    UserComponent,
    ClientPage,
    ClientListPage,
    ClientRegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide : HTTP_INTERCEPTORS, useClass:AuthInterceptorProvider,multi:true },
    CookieProvider,
    AuthProvider,
    ClientProvider,
    AddressProvider,
    CityProvider,
    StateProvider
  ]
})
export class AppModule {}
