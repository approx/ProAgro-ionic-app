import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmEditPage } from './farm-edit';
import { PipesModule } from '../../pipes/pipes.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    FarmEditPage,
  ],
  imports: [
    PipesModule,
    DirectivesModule,
    IonicPageModule.forChild(FarmEditPage),
  ],
})
export class FarmEditPageModule {}
