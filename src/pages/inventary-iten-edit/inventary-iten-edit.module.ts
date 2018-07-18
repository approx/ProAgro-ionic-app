import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventaryItenEditPage } from './inventary-iten-edit';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    InventaryItenEditPage,
  ],
  imports: [
    IonicPageModule.forChild(InventaryItenEditPage),
    DirectivesModule
  ],
})
export class InventaryItenEditPageModule {}
