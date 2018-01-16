import { CityModel } from './city.model';
import { ClientModel } from './client.model';
import { FarmModel } from './farm.model';

export interface AddressInterface{
  id?:number;
  CEP:string;
  street_name:string;
  street_number:string;
  city_id?:number
}

export class AddressModel{

  constructor(
    public CEP:string,
    public street_name:string,
    public street_number:string,
    public city:CityModel,
    public id?:number,
    public client?:ClientModel,
    public farm?:FarmModel
  ){}

}
