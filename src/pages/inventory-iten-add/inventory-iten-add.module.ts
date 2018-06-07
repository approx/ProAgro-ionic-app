import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventoryItenAddPage } from './inventory-iten-add';

@NgModule({
  declarations: [
    InventoryItenAddPage,
  ],
  imports: [
    IonicPageModule.forChild(InventoryItenAddPage),
  ],
})
export class InventoryItenAddPageModule {}
