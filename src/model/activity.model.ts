import { UnityModel } from './unity.model';
import { ActivityTypeModel } from './activityType.model';
import { CropModel } from './crop.model';

export interface ActivityInterface{
  id?:number,
  operation_date?:Date|string,
  payment_date?:Date|string,
  activity_type_id?:string,
  total_value?:number,
  value_per_ha?:number;
  quantity?:number,
  unity_id?:number,
  dose?:number,
  crop_id?:number,
  product_name?:string,
  currency_id?:string
}

export class ActivityModel{
  constructor(
    public id:number,
    public operation_date:Date|string,
    public payment_date:Date|string,
    public activity_type:ActivityTypeModel,
    public total_value:number,
    public value_per_ha:number,
    public quantity:number,
    public unity:UnityModel,
    public dose:number,
    public crop:CropModel,
    public product_name:string,
    public currency_id:string
  ){

  }
}
