
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

export interface Role{
  id:number;
  name:string;
}

export class UserModel {

  constructor(
    public id:number,
    public name:string,
    public CPF:string,
    public email:string,
    public phone:string,
    public role:Role
  ) {
  }

  getJson():any{
    return {
      id:this.id,
      name:this.name,
      CPF:this.CPF,
      phone:this.phone,
      email:this.email,
      role:{
        id:this.role.id,
        name:this.role.name
      }
    };
  }
}
