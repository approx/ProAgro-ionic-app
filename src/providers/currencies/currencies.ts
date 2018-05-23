import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { endPoint } from "../../Env";

/*
  Generated class for the CurrenciesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CurrenciesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CurrenciesProvider Provider');
  }

  public getAll():Observable<any>{
    return this.http.get(endPoint+'api/currencies');
  }

}
