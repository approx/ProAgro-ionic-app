import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the EspecificationsPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'especifications',
})
export class EspecificationsPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, ...args) {
    if(value==undefined) return '';
    let rValue ='';
    if(typeof value == 'number') value = value.toFixed(2).toString();
    value = value.replace('.', ",");
    rValue = args[0]+value.replace(/\B(?=(\d{3})+(?!\d))/g, ".") +args[1];
    return rValue;
  }
}
