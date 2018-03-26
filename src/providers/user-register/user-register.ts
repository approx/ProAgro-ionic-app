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

  public acess(name:string,email:string){
    return this.http.post(endPoint+'api/user/giveAccess',{name:name,email:email,url:app_url+"user/new/"},{responseType: 'text'});
  }

  public validToken(token){
    return this.http.get(endPoint+'/api/user_token/'+token,{responseType: 'text'});
  }

}
