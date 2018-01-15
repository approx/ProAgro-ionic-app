import { Component,Input } from '@angular/core';
import { UserModel } from '../../model/user.model';

/**
 * Generated class for the UserComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'user',
  templateUrl: 'user.html'
})
export class UserComponent {

  text: string;
  @Input() user:UserModel;

  constructor() {
    console.log('Hello UserComponent Component');
  }





}
