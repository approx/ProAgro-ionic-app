import { Component,Input } from '@angular/core';
import { ClientInteface,ClientModel } from '../../model/client.model';

/**
 * Generated class for the ContactComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'contact',
  templateUrl: 'contact.html'
})
export class ContactComponent {
  @Input() client:ClientInteface|ClientModel;
  @Input() label;
  @Input() showName:boolean;

  constructor() {
    console.log('Hello ContactComponent Component');
  }

}
