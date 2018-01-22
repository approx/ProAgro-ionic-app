import { Component,Input } from '@angular/core';
import { CropModel } from '../../model/crop.model'

/**
 * Generated class for the CropInfoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'crop-info',
  templateUrl: 'crop-info.html'
})
export class CropInfoComponent {
  @Input() crop:CropModel;

  constructor() {
    console.log('Hello CropInfoComponent Component');
  }

}
