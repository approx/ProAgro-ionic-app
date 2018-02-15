import { ActivityModel } from './activity.model';

export interface ActivityTypeInterface{
  id?:string;
  name?:string;
  unity_value?:number
}

export class ActivityTypeModel{
  constructor(
    public id:number,
    public name:string,
    public unity_value:number,
    public activities:ActivityModel[]
  ){}
}
