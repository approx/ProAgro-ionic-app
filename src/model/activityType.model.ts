import { ActivityModel } from './activity.model';

export interface ActivityTypeInterface{
  id?:string;
  name:string;
  unity_value:number;
  value_per_ha:number;
}

export class ActivityTypeModel{
  constructor(
    public id:string,
    public name:string,
    public unity_value:number,
    public value_per_ha:number,
    public activities:ActivityModel
  ){}
}
