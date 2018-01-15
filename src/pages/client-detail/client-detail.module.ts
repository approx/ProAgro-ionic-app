import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientDetailPage } from './client-detail';

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
