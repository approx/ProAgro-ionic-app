import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientRegisterPage } from './client-register';

@NgModule({
  declarations: [
    ClientRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientRegisterPage),
  ],
})
export class ClientRegisterPageModule {}
