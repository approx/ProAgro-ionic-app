import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityRegisterTotalPage } from './activity-register-total';
import { NgxMaskModule } from 'ngx-mask';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    ActivityRegisterTotalPage,
  ],
  imports: [
    DirectivesModule,
    IonicPageModule.forChild(ActivityRegisterTotalPage),
  ],
})
export class ActivityRegisterTotalPageModule {}
