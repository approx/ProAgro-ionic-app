import { HttpClient  } from '@angular/common/http';
import { endPoint } from "../Env";

import { Observable } from 'rxjs/Observable';

export interface AddressInterface{
  id?:number;
  CEP:string;
  street_name:string;
  street_number:string;
  city_id:string;
}

export class AddressModel{

  constructor(
    public CEP:string,
    public street_name:string,
    public street_number:string,
    public city_id,
    private http:HttpClient,
    public id?:number
  ){}

  getCity():Observable<any>|null{
    if(this.id){
      return this.http.get(endPoint+'/api/address/'+this.id+'/city');
    }
    else return null;
  }

  getJson():AddressInterface{
    return {
      id:this.id,
      CEP:this.CEP,
      street_name:this.street_name,
      street_number:this.street_number,
      city_id:this.city_id
    }
  }

}
