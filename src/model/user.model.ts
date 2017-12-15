import { HttpClient  } from '@angular/common/http';
import { endPoint } from "../Env";

import { Observable } from 'rxjs/Observable';

export class User{
  id:number;
  name:string;
  cpf:string;
  email:string;
  phone:string;
  constructor(id:number,name:string,cpf:string,email:string,phone:string){
    this.id = id;
    this.phone = phone;
    this.name = name;
    this.cpf = cpf;
    this.email = email;
  }


}

export class UserModel extends User{
  role:{id:number,name:string}
  private http:HttpClient;

  constructor(http:HttpClient,id:number,name:string,cpf:string,email:string,phone:string) {
    super(id,name,cpf,email,phone);
    this.http = http;
    this.http.get(endPoint+'/api/user/'+this.id+'/role').subscribe((data:any)=>{
      this.role = {id:data.id,name:data.name};
    });
  }

  getAddress():Observable<any> | null{
    if(this.id){
      return this.http.get(endPoint+'/api/user/'+this.id+'/address');
    } else return null;
  };

  getClients():Observable<any> | null{
    if(this.id){
      return this.http.get(endPoint+'/api/user/'+this.id+'/clients');
    } else return null;
  };
  getJson():any{
    return {
      id:this.id,
      name:this.name,
      cpf:this.cpf,
      phone:this.phone,
      email:this.email
    };
  }
}
