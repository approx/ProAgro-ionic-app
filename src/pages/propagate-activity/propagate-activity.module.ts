import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PropagateActivityPage } from './propagate-activity';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    PropagateActivityPage,
  ],
  imports: [
    IonicPageModule.forChild(PropagateActivityPage),
    SelectSearchableModule,
    DirectivesModule
  ],
})
export class PropagateActivityPageModule {}
