import { ActivityModel } from './activity.model';
import { UnityModel } from './unity.model';

export interface ActivityTypeInterface{
  id?:string;
  name?:string;
  unity_id?:number
}

export class ActivityTypeModel{
  constructor(
    public id:number,
    public name:string,
    public unity_id:number,
    public unity:UnityModel,
    public activities:ActivityModel[]
  ){}
}
