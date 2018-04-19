import { FieldModel } from './field.model';
import { CultureModel } from './culture.model';
import { ActivityModel } from './activity.model';
import { InventoryItenModel } from "./inventario_iten.model";

export interface CropInterface{
  id?:number,
  field_id?:number,
  initial_date?:Date|string,
  final_date?:Date|string,
  name:string,
  culture_id?:number,
  sack_expected?:number,
  itens?:string
}

interface SackSold{
  value:number;
  quantity:number;
}

export class CropModel{
  constructor(
    public id:number,
    public field:FieldModel,
    public name:string,
    public initial_date:Date,
    public final_date:Date,
    public culture:CultureModel,
    public activities:ActivityModel[],
    public inventory_itens:InventoryItenModel[],
    public sack_solds:SackSold[],
    public sack_expected:number,
    public sack_produced?:number
  ){}
}
