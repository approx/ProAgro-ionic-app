import { Directive, HostListener } from '@angular/core';

/**
 * Generated class for the OnlyNumberDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[only-number]' // Attribute selector
})
export class OnlyNumberDirective {

  constructor() {
    console.log('Hello OnlyNumberDirective Directive');
  }

  @HostListener('keyup',['$event'])
  onKeyup($event:any){
    $event.target.value = $event.target.value.replace(/\D/g,'');
  }
}
