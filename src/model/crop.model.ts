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

interface GrossIncome{
  history:{description:string,total:number},
  total:number
}

export class CropModel{
  constructor(
    public id:number,
    public field:FieldModel,
    public name:string,
    public initial_date:Date|string,
    public final_date:Date|string,
    public culture:CultureModel,
    public activities:ActivityModel[],
    public inventory_itens:InventoryItenModel[],
    public sack_solds:SackSold[],
    public sack_expected:number,
    public gross_income:GrossIncome,
    public interest_tax:number,
    public sack_value:number,
    public sack_produced?:number,
    public description?:string
  ){}
}
