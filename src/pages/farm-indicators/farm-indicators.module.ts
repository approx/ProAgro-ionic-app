import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmIndicatorsPage } from './farm-indicators';

@NgModule({
  declarations: [
    FarmIndicatorsPage,
  ],
  imports: [
    IonicPageModule.forChild(FarmIndicatorsPage),
  ],
})
export class FarmIndicatorsPageModule {}
