import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FieldListPage } from './field-list';

@NgModule({
  declarations: [
    FieldListPage,
  ],
  imports: [
    IonicPageModule.forChild(FieldListPage),
  ],
})
export class FieldListPageModule {}
