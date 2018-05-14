import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CropRegisterPage } from './crop-register';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    CropRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(CropRegisterPage),
    DirectivesModule,
  ],
})
export class CropRegisterPageModule {}
