import { AddressModel } from './address.model';
import { CultureModel } from './culture.model';
import { ClientModel } from './client.model';
import { FieldModel } from './field.model';
import { InventoryItenModel } from './inventario_iten.model';

export interface FarmInterface{
  id?:number;
  name:string;
  address_id?:number;
  client_id?:number;
  cultures:string;
  ha?:number;
  value_ha?:number;
  capital_tied?:number;
  remuneration?:number;
}

export class FarmModel{

  constructor(
    public id:number,
    public name:string,
    public address:AddressModel,
    public client:ClientModel,
    public fields:FieldModel[],
    public cultures:CultureModel[],
    public inventory_itens:InventoryItenModel[],
    public ha:number,
    public value_ha:number,
    public capital_tied:number,
    public remuneration:number
  ){}
}
