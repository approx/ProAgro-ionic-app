import { CropModel } from './crop.model';
import { FarmModel } from './farm.model'

export interface FieldTypeInterface{
  id?:number;
  name?:string;
}

export class FieldTypeModel{
  constructor(
    public id:number,
    public name:string
  ){}
}
