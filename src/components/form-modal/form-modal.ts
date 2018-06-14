import { Component,Input,Output,EventEmitter } from '@angular/core';

/**
 * Generated class for the FormModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'form-modal',
  templateUrl: 'form-modal.html'
})
export class FormModalComponent {

  text: string;

  @Input() submit;
  @Input() showVariable;
  @Output() outEvent:EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    console.log('Hello FormModalComponent Component');
    this.text = 'Hello World';
  }

  out(){
    this.showVariable=undefined;
    this.outEvent.emit(this.showVariable);
  }


  ngAfterViewInit(){
    console.log(this.submit);
  }

}
