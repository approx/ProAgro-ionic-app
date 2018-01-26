import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmListPage } from './farm-list';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    FarmListPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(FarmListPage),
  ],
})
export class FarmListPageModule {}
