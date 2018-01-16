import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FieldRegisterPage } from './field-register';

@NgModule({
  declarations: [
    FieldRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(FieldRegisterPage),
  ],
})
export class FieldRegisterPageModule {}
