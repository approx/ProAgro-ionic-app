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
      this.objs[name] = value;
      document.cookie = "user="+JSON.stringify(this.objs);
  }

  get(){
    if(document.cookie){
      let cookie = document.cookie.split('=')[1];
      this.objs=JSON.parse(cookie);
      console.log('geted cookies');
    }
    else{
      this.objs={};
    }
  }

  delete(){
    var d = new Date();
    d.setDate(d.getDate() - 1);
    this.objs = undefined;
    document.cookie = JSON.stringify(this.objs)+';expires='+d;
  }

}
