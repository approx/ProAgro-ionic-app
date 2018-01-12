import { ActivityModel } from './activity.model';

export interface UnityInterface{
  id?:number;
  name:string;
}

export class UnityModel{
  constructor(
    public id:number,
    public name:string,
    public activities:ActivityModel[]
  ){}
}
