import { UnityModel } from './unity.model';
import { ActivityTypeModel } from './activityType.model';
import { CropModel } from './crop.model';

export interface ActivityInterface{
  id?:number,
  operation_date:Date,
  payment_date:Date,
  activity_type_id:number,
  total_value:number,
  quantity:number,
  unity_id:number,
  dose:number,
  crop_id:number
}

export class ActivityModel{
  constructor(
    public id:number,
    public operation_date:Date,
    public payment_date:Date,
    public activity_type:ActivityTypeModel,
    public total_value:number,
    public quantity:number,
    public unity:UnityModel,
    public dose:number,
    public crop:CropModel
  ){

  }
}
