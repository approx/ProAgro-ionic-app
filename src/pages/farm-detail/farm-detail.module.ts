import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmDetailPage } from './farm-detail';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    FarmDetailPage
  ],
  imports: [
    PipesModule,
    ComponentsModule,
    IonicPageModule.forChild(FarmDetailPage),
  ],
})
export class FarmDetailPageModule {}
