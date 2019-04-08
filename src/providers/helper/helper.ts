//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HelperProvider {
    timer = null;

    constructor() {
        console.log('Hello HelperProvider Provider');
    }

    public debounce(func:()=>void,wait) {
        // this.timer = null;
        clearTimeout(this.timer);
        this.timer = setTimeout(func, wait);
    }

}
