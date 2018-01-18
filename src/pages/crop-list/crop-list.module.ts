import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CropListPage } from './crop-list';

@NgModule({
  declarations: [
    CropListPage,
  ],
  imports: [
    IonicPageModule.forChild(CropListPage),
  ],
})
export class CropListPageModule {}
