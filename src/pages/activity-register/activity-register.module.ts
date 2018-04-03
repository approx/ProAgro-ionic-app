import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityRegisterPage } from './activity-register';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    ActivityRegisterPage,
  ],
  imports: [
    DirectivesModule,
    IonicPageModule.forChild(ActivityRegisterPage),
  ],
})
export class ActivityRegisterPageModule {}
