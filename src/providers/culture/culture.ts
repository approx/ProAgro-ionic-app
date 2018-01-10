import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { endPoint } from "../../Env";

/*
  Generated class for the CultureProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CultureProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CultureProvider Provider');
  }

  public getAll():Observable<any>{
    return this.http.get(endPoint+'api/cultures');
  }

  public post(name:string):Observable<any>{
    return this.http.post(endPoint+'api/cultures',{name:name});
  }

  public delete(id:string):Observable<any>{
    return this.http.post(endPoint+'api/culture/'+id,{'_method':'DELETE'},{
        responseType: 'text'
     });
  }



}
