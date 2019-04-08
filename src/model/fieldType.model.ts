
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
