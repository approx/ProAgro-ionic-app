import { Injectable } from '@angular/core';

/*
  Generated class for the CookieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CookieProvider {
  public objs:any;

  constructor() {
    console.log('Hello CookieProvider Provider');
    this.get();
  }

  set(name:string,value:any){
      this.get();
      this.objs[name]=value;
      document.cookie = JSON.stringify(this.objs);
  }

  get(){
    this.objs=JSON.parse(document.cookie?document.cookie:'{}');
    console.log('geted cookies');
  }

  delete(name:string){
    this.objs[name] = undefined;
    document.cookie = JSON.stringify(this.objs);
    console.log('deleted cookie '+name);
  }

}
