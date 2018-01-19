import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CropListPage } from './crop-list';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CropListPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(CropListPage),
  ],
})
export class CropListPageModule {}
