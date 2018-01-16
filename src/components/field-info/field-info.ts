import { Component,Input } from '@angular/core';
import { FieldModel } from '../../model/field.model';

/**
 * Generated class for the FieldInfoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'field-info',
  templateUrl: 'field-info.html'
})
export class FieldInfoComponent {

  @Input() field:FieldModel;
  constructor() {
  }

}
