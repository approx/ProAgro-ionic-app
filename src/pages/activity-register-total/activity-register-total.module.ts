import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityRegisterTotalPage } from './activity-register-total';
import { NgxMaskModule } from 'ngx-mask';
import { DirectivesModule } from '../../directives/directives.module';
import { ComponentsModule } from '../../components/components.module';
import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
  declarations: [
    ActivityRegisterTotalPage,
  ],
  imports: [
    DirectivesModule,
    ComponentsModule,
    IonicPageModule.forChild(ActivityRegisterTotalPage),
    SelectSearchableModule
  ],
})
export class ActivityRegisterTotalPageModule {}
