import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventoryItenRegisterPage } from './inventory-iten-register';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    InventoryItenRegisterPage,
  ],
  imports: [
    DirectivesModule,
    IonicPageModule.forChild(InventoryItenRegisterPage),
  ],
})
export class InventoryItenRegisterPageModule {}
