import { HttpClient,HttpErrorResponse  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endPoint } from '../../Env';
import { CookieProvider } from "../cookie/cookie";
import { Token } from "../Token";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  private body = {
    'grant_type':'password',
    'client_id':1,
    'client_secret':'qu7ilTh6d0DhaGLfM2EN8gUxRpbdNVPe3tijJWDZ',
    'username': '',
    'password':'',
    'scope':'*'
  }

  private logged:boolean =false;

  constructor(public http: HttpClient, private cookie:CookieProvider) {
    console.log('Hello AuthProvider Provider');
  }

  checkIfLogged():boolean{
    return this.cookie.objs.token!=undefined;
  }

  getTokenType():string{
    return this.cookie.objs.token.token_type;
  }

  getAccessToken():string{
    return this.cookie.objs.token.access_token;
  }

  LogIn(cpf:string,password:string):Promise<any>{
    return new Promise((resolve,reject)=>{
      if(!this.checkIfLogged()){
        this.body.password = password;
        this.body.username = cpf;
        this.http.post(endPoint+'oauth/token',this.body).subscribe(
          (data:Token)=>{
            this.logged=true;
            this.cookie.set('token',data);
            resolve(data);
          },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              // A client-side or network error occurred. Handle it accordingly.
              console.log('An error occurred:', err.error.message);
              reject(err.error);
            } else {
              // The backend returned an unsuccessful response code.
              // The response body may contain clues as to what went wrong,
              console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
              reject(err);
            }
          }
        );
      }
      else{
        this.logged=true;
        resolve(this.cookie.objs.token);
      }
    });
  }

}
