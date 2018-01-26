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
  transform(value: string) {
    let newValue="R$ ";
    for (let i = 0; i < value.length; i++) {
        if(i%3==0){
          newValue+=".";
        }
        newValue+=value[i];
    }
    return newValue;
  }
}
