import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CropDetailPage } from './crop-detail';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    CropDetailPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(CropDetailPage),
  ],
})
export class CropDetailPageModule {}
