import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmRegisterPage } from './farm-register';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    FarmRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(FarmRegisterPage),
    DirectivesModule
  ],
})
export class FarmRegisterPageModule {}
