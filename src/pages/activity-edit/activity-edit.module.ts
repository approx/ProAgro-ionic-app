import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityEditPage } from './activity-edit';

@NgModule({
  declarations: [
    ActivityEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivityEditPage),
  ],
})
export class ActivityEditPageModule {}
