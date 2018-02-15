import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { endPoint } from "../../Env";
import { CropInterface } from '../../model/crop.model';
/*
  Generated class for the CropProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

interface CropInterfaceWithMethod extends CropInterface{
  _method?:string;
}

@Injectable()
export class CropProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CropProvider Provider');
  }

  getAll():Observable<any>{
    return this.http.get(endPoint+'api/crops');
  }

  get(id:number):Observable<any>{
    return this.http.get(endPoint+'api/crop/'+id);
  }

  save(crop:CropInterface):Observable<any>{
    return this.http.post(endPoint+'api/crops',crop);
  }

  delete(id:number):Observable<any>{
    return this.http.post(endPoint+'api/crop/'+id,{_method:'DELETE'});
  }

  update(crop:CropInterfaceWithMethod):Observable<any>{
    crop._method="PUT";
    return this.http.post(endPoint+'api/crop/'+crop.id,crop);
  }
}
