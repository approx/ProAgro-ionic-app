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

export interface RegisterSack{
  crop_id?:number;
  value?:number;
  quantity?:number;
  currency_id?:string;
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
    return this.http.post(endPoint+'api/crop/'+id,{_method:'DELETE'},{responseType:'text'});
  }

  update_values(id,sack_value,interest_tax):Observable<any>{
    return this.http.post(endPoint+'api/crop/'+id+'/update_values',{sack_value:sack_value,interest_tax:interest_tax});
  }

  update_inventory_itens(id,itemsIds):Observable<any>{
    return this.http.post(endPoint+'api/crop/'+id+'/update_inventory_itens',{inventory_itens:itemsIds},{responseType:'text'});
  }

  update(crop:CropInterfaceWithMethod):Observable<any>{
    crop._method="PUT";
    return this.http.post(endPoint+'api/crop/'+crop.id,crop);
  }

  register_sack(registerSack:RegisterSack,crop_id:number):Observable<any>{
    return this.http.post(endPoint+'api/crop/'+crop_id+'/sold_sack',registerSack);
  }
}
