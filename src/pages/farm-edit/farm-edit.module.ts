import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmEditPage } from './farm-edit';

@NgModule({
  declarations: [
    FarmEditPage,
  ],
  imports: [
    IonicPageModule.forChild(FarmEditPage),
  ],
})
export class FarmEditPageModule {}
