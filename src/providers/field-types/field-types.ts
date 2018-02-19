import { HttpClient } from '@angular/common/http';
import { endPoint } from "../../Env";
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FieldInterface } from '../../model/field.model';

/*
  Generated class for the FieldTypesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FieldTypesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello FieldTypesProvider Provider');
  }

  getAll():Observable<any>{
    return this.http.get(endPoint+'api/field_types');
  }

  get(id:number):Observable<any>{
    return this.http.get(endPoint+'api/field_type/'+id);
  }

  save(field:FieldInterface):Observable<any>{
    return this.http.post(endPoint+'api/field_types',field);
  }

  delte(id):Observable<any>{
    return this.http.post(endPoint+'api/field_type/'+id,{_method:'DELETE'});
  }

}
