import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventoryItenSalePage } from './inventory-iten-sale';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    InventoryItenSalePage,
  ],
  imports: [
    IonicPageModule.forChild(InventoryItenSalePage),
    DirectivesModule
  ],
})
export class InventoryItenSalePageModule {}
