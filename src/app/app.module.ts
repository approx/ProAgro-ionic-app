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
import { DashBoardPageModule } from '../pages/dash-board/dash-board.module';
import { LoginPage } from '../pages/login/login';
import { LoginPageModule } from '../pages/login/login.module';
import { ClientPage } from '../pages/client/client';
import { ClientPageModule } from '../pages/client/client.module';
import { ClientListPage } from '../pages/client-list/client-list';
import { ClientListPageModule } from '../pages/client-list/client-list.module';
import { ClientRegisterPage } from '../pages/client-register/client-register';
import { ClientRegisterPageModule } from '../pages/client-register/client-register.module';
import { ClientDetailPage } from  '../pages/client-detail/client-detail';
import { ClientDetailPageModule } from  '../pages/client-detail/client-detail.module';
//Providers
import { AuthProvider } from '../providers/auth/auth';
import { CookieProvider } from '../providers/cookie/cookie';
import { AuthInterceptorProvider } from '../providers/auth-interceptor/auth-interceptor';
import { ClientProvider } from '../providers/client/client';
import { AddressProvider } from '../providers/address/address';
import { CityProvider } from '../providers/city/city';
import { StateProvider } from '../providers/state/state';
//Components
import { NavBarComponent } from "../components/nav-bar/nav-bar";
import { UserComponent } from "../components/user/user";
import { ContactComponent } from "../components/contact/contact";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NavBarComponent,
    UserComponent,
    FilterPipe,
    // LoginPage,
    // DashBoardPage,
    // ClientPage,
    // ClientListPage,
    // ClientRegisterPage,
    // ClientDetailPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    LoginPageModule,
    DashBoardPageModule,
    ClientPageModule,
    ClientListPageModule,
    ClientRegisterPageModule,
    ClientDetailPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    DashBoardPage,
    UserComponent,
    ClientPage,
    ClientListPage,
    ClientRegisterPage,
    ClientDetailPage
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
