import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityDetailPage } from './activity-detail';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ActivityDetailPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(ActivityDetailPage),
  ],
})
export class ActivityDetailPageModule {}
