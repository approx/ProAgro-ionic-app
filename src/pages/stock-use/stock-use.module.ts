import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockUsePage } from './stock-use';

@NgModule({
  declarations: [
    StockUsePage,
  ],
  imports: [
    IonicPageModule.forChild(StockUsePage),
  ],
})
export class StockUsePageModule {}
