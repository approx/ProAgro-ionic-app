import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmDetailPage } from './farm-detail';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';
import { ChartsModule } from "ng2-charts";

@NgModule({
  declarations: [
    FarmDetailPage
  ],
  imports: [
    PipesModule,
    ComponentsModule,
    IonicPageModule.forChild(FarmDetailPage),
    ChartsModule
  ],
})
export class FarmDetailPageModule {}
