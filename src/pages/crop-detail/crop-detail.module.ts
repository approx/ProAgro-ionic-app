import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CropDetailPage } from './crop-detail';

@NgModule({
  declarations: [
    CropDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CropDetailPage),
  ],
})
export class CropDetailPageModule {}
