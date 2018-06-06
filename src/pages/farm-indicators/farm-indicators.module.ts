import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmIndicatorsPage } from './farm-indicators';
import { ComponentsModule } from '../../components/components.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    FarmIndicatorsPage,
  ],
  imports: [
    IonicPageModule.forChild(FarmIndicatorsPage),
    ComponentsModule,
    DirectivesModule
  ],
})
export class FarmIndicatorsPageModule {}
