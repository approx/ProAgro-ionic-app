import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StocksPage } from './stocks';
import { DirectivesModule } from '../../directives/directives.module';
import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
  declarations: [
    StocksPage,
  ],
  imports: [
    DirectivesModule,
    IonicPageModule.forChild(StocksPage),
    SelectSearchableModule
  ],
})
export class StocksPageModule {}
