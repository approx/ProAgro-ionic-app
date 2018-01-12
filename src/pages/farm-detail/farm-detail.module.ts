import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmDetailPage } from './farm-detail';
import { AddressComponent } from '../../components/address/address';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    FarmDetailPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(FarmDetailPage),
  ],
})
export class FarmDetailPageModule {}
