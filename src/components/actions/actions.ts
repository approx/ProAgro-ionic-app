import { Component,Input } from '@angular/core';

/**
 * Generated class for the ActionsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
export interface ActionInterface{
  label:string;
  down:()=>{};
}

@Component({
  selector: 'actions',
  templateUrl: 'actions.html'
})
export class ActionsComponent {

  @Input() actions:ActionInterface;

  constructor() {
    console.log('Hello ActionsComponent Component');
  }

}
