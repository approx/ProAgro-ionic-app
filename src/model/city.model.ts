import { HttpClient  } from '@angular/common/http';
import { endPoint } from "../Env";

import { Observable } from 'rxjs/Observable';

export interface CityInterface{
  id?:number;
  name:string;
  state_id:string;
}

export class CityModel{

  constructor(
    public id:number,
    public name:string,
    public state_id:string,
    private http:HttpClient
  ){}

  public static CreateFromInterface(inter:CityInterface,http:HttpClient):CityModel{
    return new CityModel(inter.id,inter.name,inter.state_id,http);
  }

  getState():Observable<any>{
    return this.http.get(endPoint+'api/state/'+this.state_id);
  }

}
