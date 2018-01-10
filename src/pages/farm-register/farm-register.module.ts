import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmRegisterPage } from './farm-register';

@NgModule({
  declarations: [
    FarmRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(FarmRegisterPage),
  ],
})
export class FarmRegisterPageModule {}
