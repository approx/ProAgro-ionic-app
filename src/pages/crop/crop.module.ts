import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CropPage } from './crop';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CropPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(CropPage),
  ],
})
export class CropPageModule {}
