import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FieldDetailPage } from './field-detail';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    FieldDetailPage
  ],
  imports: [
    ComponentsModule,
    PipesModule,
    IonicPageModule.forChild(FieldDetailPage),
  ],
})
export class FieldDetailPageModule {}
