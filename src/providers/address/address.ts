import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { endPoint } from "../../Env";
import { AddressInterface } from '../../model/address.model';

/*
  Generated class for the AddressProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AddressProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AddressProvider Provider');
  }

  getAll():Observable<any>{
    return this.http.get(endPoint+'api/addresses');
  }

  register(address:AddressInterface):Observable<any>{
    return this.http.post(endPoint+'api/addresses',address);
  }

}
