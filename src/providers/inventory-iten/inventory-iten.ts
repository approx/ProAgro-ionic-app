import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endPoint } from "../../Env";
import { InventoryItenInterface } from '../../model/inventario_iten.model';

/*
  Generated class for the InventoryItenProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
interface InventoryItenWithMethod extends InventoryItenInterface{
  _method;
}

@Injectable()
export class InventoryItenProvider {

  constructor(public http: HttpClient) {
    console.log('Hello InventoryItenProvider Provider');
  }

  getAll():Observable<any>{
    return this.http.get(endPoint+'api/inventories');
  }

  get(id:number):Observable<any>{
    return this.http.get(endPoint+'api/inventory/'+id);
  }

  save(inventory_iten:InventoryItenInterface):Observable<any>{
    return this.http.post(endPoint+'api/inventories',inventory_iten);
  }

  delte(id):Observable<any>{
    return this.http.post(endPoint+'api/inventory/'+id,{_method:'DELETE'});
  }

  update(iten:InventoryItenWithMethod):Observable<any>{
    iten._method='PUT';
    return this.http.post(endPoint+'api/inventory/'+iten.id,iten);
  }

}
