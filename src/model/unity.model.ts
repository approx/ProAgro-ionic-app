import { ActivityModel } from './activity.model';

export interface UnityInterface{
  id?:string;
  name?:string;
}

export class UnityModel{
  constructor(
    public id:string,
    public name:string,
    public activities:ActivityModel[]
  ){}
}
