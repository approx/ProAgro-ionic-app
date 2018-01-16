import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FieldDetailPage } from './field-detail';

@NgModule({
  declarations: [
    FieldDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FieldDetailPage),
  ],
})
export class FieldDetailPageModule {}
