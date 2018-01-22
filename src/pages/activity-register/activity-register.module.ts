import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityRegisterPage } from './activity-register';

@NgModule({
  declarations: [
    ActivityRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivityRegisterPage),
  ],
})
export class ActivityRegisterPageModule {}
