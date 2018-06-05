import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmIndicatorsPage } from './farm-indicators';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    FarmIndicatorsPage,
  ],
  imports: [
    IonicPageModule.forChild(FarmIndicatorsPage),
    ComponentsModule
  ],
})
export class FarmIndicatorsPageModule {}
