import { CityModel } from './city.model';
import { ClientModel } from './client.model';
import { FarmModel } from './farm.model';

export interface AddressInterface{
  id?:number;
  CEP:string;
  street_name:string;
  street_number:string;
  city:string,
  state:string,
  country:string,
}

export class AddressModel{

  constructor(
    public CEP:string,
    public street_name:string,
    public street_number:string,
    public city:string,
    public state:string,
    public country:string,
    public id?:number,
    public client?:ClientModel,
    public farm?:FarmModel
  ){}

}
