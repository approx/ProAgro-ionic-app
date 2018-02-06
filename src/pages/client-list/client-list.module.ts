import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientListPage } from './client-list';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ClientListPage
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(ClientListPage),
  ]
})
export class ClientListPageModule {}
