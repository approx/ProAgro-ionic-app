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
import { FarmPage } from "../pages/farm/farm";
import { FarmPageModule } from "../pages/farm/farm.module";
import { FarmListPage } from "../pages/farm-list/farm-list";
import { FarmListPageModule } from "../pages/farm-list/farm-list.module";
import { FarmRegisterPage } from "../pages/farm-register/farm-register";
import { FarmRegisterPageModule } from "../pages/farm-register/farm-register.module";
import { CulturePage } from "../pages/culture/culture";
import { CulturePageModule } from "../pages/culture/culture.module";
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
import { CultureProvider } from '../providers/culture/culture';
import { FarmProvider } from '../providers/farm/farm';
import { FieldProvider } from '../providers/field/field';
import { MessagesProvider } from '../providers/messages/messages';
import { PipesModule } from '../pipes/pipes.module';
import { CropProvider } from '../providers/crop/crop';
import { ActivityProvider } from '../providers/activity/activity';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NavBarComponent,
    UserComponent
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
    FarmPageModule,
    FarmListPageModule,
    FarmRegisterPageModule,
    CulturePageModule,
    PipesModule,
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
    ClientDetailPage,
    FarmPage,
    FarmListPage,
    FarmRegisterPage,
    CulturePage
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
    StateProvider,
    CultureProvider,
    FarmProvider,
    FieldProvider,
    MessagesProvider,
    CropProvider,
    ActivityProvider
  ]
})
export class AppModule {}
