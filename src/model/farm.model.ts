import { AddressModel } from './address.model';
import { CultureModel } from './culture.model';
import { ClientModel } from './client.model';
import { FieldModel } from './field.model';

export interface FarmInterface{
  id?:number;
  name:string;
  address_id?:number;
  client_id?:number;
  cultures:string;
}

export class FarmModel{

  constructor(
    public id:number,
    public name:string,
    public address:AddressModel,
    public client:ClientModel,
    public fields:FieldModel[],
    public cultures:CultureModel[]
  ){}
}