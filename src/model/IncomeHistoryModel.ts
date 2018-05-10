import { ActivityModel } from './activity.model';
import { InventoryItenModel } from './inventario_iten.model';
import { CropModel } from './crop.model';

export class IncomHistoryModel{

  constructor(
    public id:number,
    public date:string,
    public description:string,
    public value:number,
    public activity?:ActivityModel,
    public inventory_iten?:InventoryItenModel,
    public sack_sold?:{value:number,quantity:number,crop:CropModel}
  ){}


}
