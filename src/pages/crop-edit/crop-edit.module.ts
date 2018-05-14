import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CropEditPage } from './crop-edit';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    CropEditPage,
  ],
  imports: [
    IonicPageModule.forChild(CropEditPage),
    DirectivesModule
  ],
})
export class CropEditPageModule {}
