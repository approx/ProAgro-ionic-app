import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { endPoint } from "../../Env";

/*
  Generated class for the StateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StateProvider {

  constructor(public http: HttpClient) {
    console.log('Hello StateProvider Provider');
  }

  getAll():Observable<any>{
    return this.http.get(endPoint+'api/states');
  }

}
