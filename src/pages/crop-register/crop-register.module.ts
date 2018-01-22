import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CropRegisterPage } from './crop-register';

@NgModule({
  declarations: [
    CropRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(CropRegisterPage),
  ],
})
export class CropRegisterPageModule {}
