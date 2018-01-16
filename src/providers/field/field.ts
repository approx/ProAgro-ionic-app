import { HttpClient } from '@angular/common/http';
import { endPoint } from "../../Env";
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FieldInterface } from '../../model/field.model';

/*
  Generated class for the FieldProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
interface FieldInterfaceWithMethod extends FieldInterface {
    _method:string;
}

@Injectable()
export class FieldProvider {

  constructor(public http: HttpClient) {
    console.log('Hello FieldProvider Provider');
  }

  getAll():Observable<any>{
    return this.http.get(endPoint+'api/fields');
  }

  get(id:number):Observable<any>{
    return this.http.get(endPoint+'api/field/'+id);
  }

  save(field:FieldInterface):Observable<any>{
    return this.http.post(endPoint+'api/fields',field);
  }

  delte(id):Observable<any>{
    return this.http.post(endPoint+'api/fields',{_method:'DELETE'});
  }

  update(field:FieldInterfaceWithMethod):Observable<any>{
    field._method='PUT';
    return this.http.post(endPoint+'api/fields',field);
  }
}
