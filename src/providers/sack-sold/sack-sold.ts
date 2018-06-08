import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endPoint } from "../../Env";

/*
  Generated class for the SackSoldProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SackSoldProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SackSoldProvider Provider');
  }

  public delete(id):Observable<any>{
    return this.http.post(endPoint+'api/sack_sold/'+id,{_method:'DELETE'},{responseType:'text'});
  }

}
