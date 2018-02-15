import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientInteface } from '../../model/client.model';
import { Observable } from 'rxjs/Observable';
import { endPoint } from "../../Env";

/*
  Generated class for the ClientProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
interface ClientUpdate extends ClientInteface{
  _method?:string;
}

@Injectable()
export class ClientProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ClientProvider Provider');
  }

  getAll():Observable<any>{
    return this.http.get(endPoint+'api/clients');
  }

  get(id:number){
    return this.http.get(endPoint+'api/client/'+id);
  }

  Register(client:ClientInteface):Observable<any>{
    return this.http.post(endPoint+'api/clients',client);
  }

  update(client:ClientUpdate):Observable<any>{
    client._method="PUT";
    return this.http.post(endPoint+'api/client/'+client.id,client);
  }

}
