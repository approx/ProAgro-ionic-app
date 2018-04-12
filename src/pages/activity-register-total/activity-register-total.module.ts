import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityRegisterTotalPage } from './activity-register-total';
import { NgxMaskModule } from 'ngx-mask';
import { DirectivesModule } from '../../directives/directives.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ActivityRegisterTotalPage,
  ],
  imports: [
    DirectivesModule,
    ComponentsModule,
    IonicPageModule.forChild(ActivityRegisterTotalPage),
  ],
})
export class ActivityRegisterTotalPageModule {}
