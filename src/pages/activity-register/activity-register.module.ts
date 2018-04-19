import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityRegisterPage } from './activity-register';
import { DirectivesModule } from '../../directives/directives.module';
import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
  declarations: [
    ActivityRegisterPage,
  ],
  imports: [
    DirectivesModule,
    IonicPageModule.forChild(ActivityRegisterPage),
    SelectSearchableModule
  ],
})
export class ActivityRegisterPageModule {}
