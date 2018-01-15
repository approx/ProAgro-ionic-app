import { AddressModel } from './address.model';
import { FarmModel } from './farm.model';
import { UserModel } from './user.model';

export interface ClientInteface{
  id?:number;
  name:string;
  phone:string;
  inscription_number:string;
  cpf_cnpj:string;
  user_id?:number
  phone2?:string;
  email?:string;
  address_id?:number;
}

export class ClientModel{

  constructor(
    public id:number,
    public name:string,
    public phone:string,
    public inscription_number:string,
    public cpf_cnpj:string,
    public address:AddressModel,
    public farms:FarmModel[],
    public user:UserModel,
    public phone2?:string,
    public email?:string
  ){}
}
