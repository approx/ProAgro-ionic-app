import { FieldModel } from './field.model';
import { CultureModel } from './culture.model';
import { ActivityModel } from './activity.model';

export interface CropInterface{
  id?:number,
  field_id?:number,
  initial_date?:Date,
  final_date?:Date,
  name:string,
  culture_id?:number,
  expected?:number,
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
    public expected:number,
    public sack?:number
  ){}
}
