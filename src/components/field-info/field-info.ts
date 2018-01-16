import { Component } from '@angular/core';

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

  text: string;

  constructor() {
    console.log('Hello FieldInfoComponent Component');
    this.text = 'Hello World';
  }

}
