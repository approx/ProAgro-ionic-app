import { NgModule } from '@angular/core';
import { NavBarComponent } from './nav-bar/nav-bar';
import { UserComponent } from './user/user';
import { ContactComponent } from './contact/contact';
import { AddressComponent } from './address/address';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FarmInfoComponent } from './farm-info/farm-info';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { PhonePipe } from '../pipes/phone/phone';
import { CultureComponent } from './culture/culture';
import { ActionsComponent } from './actions/actions';

// @NgModule({
// 	declarations: [NavBarComponent,
//     UserComponent,
//     ContactComponent,
//     AddressComponent,
//     FarmInfoComponent],
// 	imports: [],
// 	exports: [NavBarComponent,
//     UserComponent,
//     ContactComponent,
//     AddressComponent,
//     FarmInfoComponent]
// })
@NgModule({
	declarations: [
    AddressComponent,
		ContactComponent,
    PhonePipe,
    CultureComponent,
    ActionsComponent,
	],
	imports: [CommonModule,IonicModule],
	exports: [
    AddressComponent,
		ContactComponent,
    CultureComponent,
    ActionsComponent
	]
})
export class ComponentsModule {}
