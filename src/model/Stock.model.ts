import { ActivityTypeModel } from './activityType.model';
import { FarmModel } from './farm.model';

export interface StockInterface{
  activity_type_id?:number;
  quantity?:number;
  unity_value?:number;
  product_name?:string;
}

export class StockModel{
    id:number;
    activity_type:ActivityTypeModel;
    quanity:number;
    product_name:string;
    unity_value:number;
    total_value:number;
    farm:FarmModel;
}
