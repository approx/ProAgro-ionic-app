import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PhonePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    if(!value) return value;
    return value.replace(/(\d{2})(\d{4})(\d{4})/,"($1) $2-$3");
  }
}
