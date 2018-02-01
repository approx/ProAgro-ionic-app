import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventoryItenRegisterPage } from './inventory-iten-register';

@NgModule({
  declarations: [
    InventoryItenRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(InventoryItenRegisterPage),
  ],
})
export class InventoryItenRegisterPageModule {}
