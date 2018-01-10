import { HttpClient  } from '@angular/common/http';
import { endPoint } from "../Env";
import { Observable } from 'rxjs/Observable';

export interface FarmInterface{
  id?:number;
  name:string;
  address_id?:number;
  client_id?:number;
  cultures?:string;
}

export class FarmModel{

  constructor(
    public id:number,
    public name:string,
    public address_id:number,
    public client_id:number,
    public http:HttpClient
  ){}

  public static CreateFromInterface(farm:FarmInterface,http:HttpClient):FarmModel{
    return new FarmModel(
      farm.id,
      farm.name,
      farm.address_id,
      farm.client_id,
      http
    );
  }

  public getAddress():Observable<any>{
    return this.http.get(endPoint+'/api/farm/'+this.id+'/address');
  }

  public getClient():Observable<any>{
    return this.http.get(endPoint+'/api/farm/'+this.id+'/client');
  }

  public getFields():Observable<any>{
    return this.http.get(endPoint+'/api/farm/'+this.id+'/fields');
  }

  public getCultures():Observable<any>{
    return this.http.get(endPoint+'/api/farm/'+this.id+'/cultures');
  }
}
