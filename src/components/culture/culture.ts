import { Component ,Input} from '@angular/core';
import { CultureModel } from '../../model/culture.model';

/**
 * Generated class for the CultureComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'culture',
  templateUrl: 'culture.html'
})
export class CultureComponent {
  @Input() cultures:CultureModel[];

  constructor() {
    console.log('Hello CultureComponent Component');
  }

}
