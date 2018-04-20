import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { endPoint } from "../../Env";
import { FarmInterface } from "../../model/farm.model";

/*
  Generated class for the FarmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
interface FarmUpdate extends FarmInterface{
  _method?:string;
}

@Injectable()
export class FarmProvider {

  constructor(public http: HttpClient) {
    console.log('Hello FarmProvider Provider');
  }

  public getAll():Observable<any>{
    return this.http.get(endPoint+'/api/farms');
  }

  public get(id:number):Observable<any>{
    return this.http.get(endPoint+'/api/farm/'+id);
  }

  public post(farm:FarmInterface):Observable<any>{
    return this.http.post(endPoint+'/api/farms',farm);
  }

  public delete(id:number):Observable<any>{
    return this.http.post(endPoint+'/api/farm/'+id,{_method:'DELETE'},{responseType:'text'});
  }

  public update(farm:FarmUpdate):Observable<any>{
    farm._method="PUT";
    return this.http.post(endPoint+'api/farm/'+farm.id,farm);
  }

}
