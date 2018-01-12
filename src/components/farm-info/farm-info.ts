import { Component,Input } from '@angular/core';
import { FarmModel } from '../../model/farm.model';

/**
 * Generated class for the FarmInfoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'farm-info',
  templateUrl: 'farm-info.html'
})
export class FarmInfoComponent {

  @Input() farm:FarmModel;
  text:string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus rhoncus vulputate ligula, sed ullamcorper ex aliquet aliquam.';
  budget:number = 10000;


  constructor() {
    console.log('Hello FarmInfoComponent Component');
  }

}
