import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmListPage } from './farm-list';
import { FarmInfoComponent } from '../../components/farm-info/farm-info';

@NgModule({
  declarations: [
    FarmListPage,
    FarmInfoComponent
  ],
  imports: [
    IonicPageModule.forChild(FarmListPage),
  ],
})
export class FarmListPageModule {}
