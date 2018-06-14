import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CropDetailPage } from './crop-detail';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from "../../components/components.module";
import { ChartsModule } from "ng2-charts";
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    CropDetailPage,
  ],
  imports: [
    PipesModule,
    ComponentsModule,
    ChartsModule,
    IonicPageModule.forChild(CropDetailPage),
    DirectivesModule
  ],
})
export class CropDetailPageModule {}
