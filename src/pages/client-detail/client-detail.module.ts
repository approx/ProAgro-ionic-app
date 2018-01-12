import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientDetailPage } from './client-detail';

import { ContactComponent } from "../../components/contact/contact";
import { AddressComponent } from "../../components/address/address";
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ClientDetailPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ClientDetailPage),
  ],
})
export class ClientDetailPageModule {}
