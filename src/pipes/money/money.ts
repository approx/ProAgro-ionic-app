import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the MoneyPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'money',
})
export class MoneyPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    if(!value) return value;
    value = value.toString();
    value = value.replace('.',',');
    value = value.replace(/(?=[^,])(\D)+/gi,'');
    let valueArray = value.split(',');
    value = valueArray[0];
    let afterComma = valueArray[1];
    let nValue="";
    let count = 0;
    for (let i = value.length-1; i >= 0; i--) {
        nValue= value[i] + nValue;
        count++;
        if(count==3&&i>0){
          nValue='.'+nValue;
          count = 0;
        }
    }
    return afterComma ? 'R$ '+nValue+','+afterComma : 'R$ '+nValue;
  }
}
