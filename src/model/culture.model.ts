import { FarmModel } from './farm.model';
import { CropModel } from './crop.model';

export interface CultureInterface{
  id?:number;
  name:string;
}

export class CultureModel{

  constructor(
    public id:number,
    public name:string,
    public farms:FarmModel[],
    public crops:CropModel[]
  ){}

}
