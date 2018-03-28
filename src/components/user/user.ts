import { Component,Input } from '@angular/core';
import { UserModel } from '../../model/user.model';
import { MyApp } from '../../app/app.component';

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
  version;

  constructor() {
    console.log('Hello UserComponent Component');
    this.version = MyApp.instance.version;
  }





}
