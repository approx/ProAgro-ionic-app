import { HttpClient  } from '@angular/common/http';
import { endPoint } from "../Env";
import { Observable } from 'rxjs/Observable';

export interface ClientInteface{
  id?:number;
  name?:string;
  phone?:string;
  inscription_number?:string;
  cpf_cnpj:string;
  phone2?:string;
  email?:string;
  address_id?:number;
  user_id?:number;
}

export class ClientModel{

  constructor(
    public name:string,
    public phone:string,
    public inscription_number:string,
    public cpf_cnpj:string,
    public user_id:number,
    public address_id:number,
    public id:number,
    private http:HttpClient,
    public phone2?:string,
    public email?:string
  ){}

  getUser():Observable<any>|null{
    if(this.id){
      return this.http.get(endPoint+'/api/client/'+this.id+'/user');
    } else return null;
  }

  getFarms():Observable<any>|null{
    if(this.id){
      return this.http.get(endPoint+'/api/client/'+this.id+'/farms');
    } else return null;
  }

  getJson():ClientInteface{
    return {
      name:this.name,
      phone:this.phone,
      inscription_number:this.inscription_number,
      cpf_cnpj:this.cpf_cnpj,
      phone2:this.phone2,
      email:this.email,
      address_id:this.address_id,
      user_id:this.user_id
    }
  }
}
