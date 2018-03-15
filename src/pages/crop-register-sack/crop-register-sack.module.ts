import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CropRegisterSackPage } from './crop-register-sack';
import { ComponentsModule } from "../../components/components.module";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    CropRegisterSackPage,
  ],
  imports: [
    ComponentsModule,
    PipesModule,
    IonicPageModule.forChild(CropRegisterSackPage),
  ],
})
export class CropRegisterSackPageModule {}
