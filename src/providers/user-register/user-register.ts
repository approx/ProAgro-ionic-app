import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endPoint,app_url } from "../../Env";

/*
  Generated class for the UserRegisterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserRegisterProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UserRegisterProvider Provider');
  }

  public acess(name:string,email:string,role_id:number){
    return this.http.post(endPoint+'api/user/giveAccess',{name:name,email:email,role_id:role_id,url:app_url+"user/new/"},{responseType: 'text'});
  }

  public validToken(token){
    return this.http.get(endPoint+'/api/user_token/'+token,{responseType: 'text'});
  }

}
