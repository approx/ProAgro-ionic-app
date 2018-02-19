import { FarmModel } from './farm.model';

export interface InventoryItenInterface{
  id?:number;
  name?:string;
  price?:number;
  depreciation_time?:number;
  depreciation_value?:number;
  farm_id?:number;
}

export class InventoryItenModel{
  constructor(
    public selected:boolean,
    public id:number,
    public name:string,
    public price:number,
    public depreciation_time:number,
    public depreciation_value:number,
    public farm:FarmModel
  ){}
}
