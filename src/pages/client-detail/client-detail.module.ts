import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientDetailPage } from './client-detail';

import { ContactComponent } from "../../components/contact/contact";
import { AddressComponent } from "../../components/address/address";
import { PhonePipe } from '../../pipes/phone/phone';

@NgModule({
  declarations: [
    ClientDetailPage,
    ContactComponent,
    PhonePipe,
    AddressComponent
  ],
  imports: [
    IonicPageModule.forChild(ClientDetailPage),
  ],
})
export class ClientDetailPageModule {}
