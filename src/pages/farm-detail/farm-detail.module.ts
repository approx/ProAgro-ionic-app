import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmDetailPage } from './farm-detail';

@NgModule({
  declarations: [
    FarmDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FarmDetailPage),
  ],
})
export class FarmDetailPageModule {}
