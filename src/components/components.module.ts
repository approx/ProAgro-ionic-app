import { NgModule } from '@angular/core';
import { ContactComponent } from './contact/contact';
import { AddressComponent } from './address/address';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
import { CultureComponent } from './culture/culture';
import { ActionsComponent } from './actions/actions';
import { FieldInfoComponent } from './field-info/field-info';
import { CropInfoComponent } from './crop-info/crop-info';

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
    CultureComponent,
    ActionsComponent,
    FieldInfoComponent,
    CropInfoComponent,
	],
	imports: [CommonModule,IonicModule,PipesModule],
	exports: [
    AddressComponent,
		ContactComponent,
    CultureComponent,
    ActionsComponent,
    FieldInfoComponent,
    CropInfoComponent
	]
})
export class ComponentsModule {}
