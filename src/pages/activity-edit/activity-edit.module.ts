import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityEditPage } from './activity-edit';
import { NgxMaskModule } from 'ngx-mask';
import { DirectivesModule } from '../../directives/directives.module';
import { ComponentsModule } from '../../components/components.module';
import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
  declarations: [
    ActivityEditPage,
  ],
  imports: [
    DirectivesModule,
    ComponentsModule,
    IonicPageModule.forChild(ActivityEditPage),
    SelectSearchableModule
  ],
})
export class ActivityEditPageModule {}
