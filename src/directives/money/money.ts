import { Directive, HostListener,ViewChild,AfterViewInit } from '@angular/core';
import {NG_VALUE_ACCESSOR,ControlValueAccessor,NgModel} from '@angular/forms';
/**
 * Generated class for the MoneyDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[money]', // Attribute selector
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: MoneyDirective,
    multi: true
  }]
})
export class MoneyDirective implements AfterViewInit {

  onTouched: any;
  _onChange: any;


  constructor() {
    console.log('Hello MoneyDirective Directive');
  }

  ngAfterViewInit() {
  }

  @HostListener('keyup',['$event'])
  onKeyup($event:any){
    if($event.keyCode==8){
      if($event.target.value=='R$ '){
        $event.target.value='';
      }
    }
    else{
      let value:string = $event.target.value;
      value = value.replace(/\D/g,'');
      $event.target.value = value.length>0 ? 'R$ '+value: '';
    }
  }

  @HostListener('focus', ['$event'])
  onFocus($event: any) {
    console.log('focused');
    // if(!$event.target.value){
    //   $event.target.value='R$ ';
    // }
    // else{
    //   $event.target.value='R$ '+$event.target.value.replace(/\D/g,'');
    // }
  }

  @HostListener('blur', ['$event'])
  onBlur($event: any) {
  }
}
