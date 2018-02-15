import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FieldEditPage } from './field-edit';

@NgModule({
  declarations: [
    FieldEditPage,
  ],
  imports: [
    IonicPageModule.forChild(FieldEditPage),
  ],
})
export class FieldEditPageModule {}
