import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityTypePage } from './activity-type';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    ActivityTypePage,
  ],
  imports: [
    DirectivesModule,
    IonicPageModule.forChild(ActivityTypePage),
  ],
})
export class ActivityTypePageModule {}
