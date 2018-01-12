import { CropModel } from './crop.model';
import { FarmModel } from './farm.model'

export interface FieldInterface{
  id?:number;
  actual_crop:number;
  name:string;
  area:number;
  lat:number;
  lng:number;
  farm_id:number;
}

export class FieldModel{
  constructor(
    public id:number,
    public crop:CropModel,
    public crops:CropModel[],
    public name:string,
    public area:number,
    public lat:number,
    public lng:number,
    public farm:FarmModel
  ){}
}
