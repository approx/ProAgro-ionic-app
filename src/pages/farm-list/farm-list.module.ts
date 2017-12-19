import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmListPage } from './farm-list';

@NgModule({
  declarations: [
    FarmListPage,
  ],
  imports: [
    IonicPageModule.forChild(FarmListPage),
  ],
})
export class FarmListPageModule {}
