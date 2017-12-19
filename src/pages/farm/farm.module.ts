import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmPage } from './farm';

@NgModule({
  declarations: [
    FarmPage,
  ],
  imports: [
    IonicPageModule.forChild(FarmPage),
  ],
})
export class FarmPageModule {}
