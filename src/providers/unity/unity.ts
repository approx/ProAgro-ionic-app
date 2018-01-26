import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { endPoint } from "../../Env";
import { UnityInterface } from '../../model/unity.model';

/*
  Generated class for the UnityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UnityProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UnityProvider Provider');
  }

  public getAll():Observable<any>{
    return this.http.get(endPoint+'api/unities');
  }

  public post(unity:UnityInterface):Observable<any>{
    return this.http.post(endPoint+'api/unities',unity);
  }

  public delete(id:string):Observable<any>{
    return this.http.post(endPoint+'api/unity/'+id,{'_method':'DELETE'},{
        responseType: 'text'
     });
  }

}
