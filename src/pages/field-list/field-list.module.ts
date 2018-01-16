import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FieldListPage } from './field-list';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    FieldListPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(FieldListPage),
  ],
})
export class FieldListPageModule {}
