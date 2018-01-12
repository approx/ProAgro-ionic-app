import { Observable } from 'rxjs/Observable';
import { StateModel } from './state.model';
import { AddressModel } from './address.model';

export interface CityInterface{
  id?:number;
  name:string;
  state_id:string;
}

export class CityModel{

  constructor(
    public id:number,
    public name:string,
    public state:StateModel,
    public addresses:AddressModel[]
  ){}

}
