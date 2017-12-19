import { HttpInterceptor,HttpRequest,HttpHandler,HttpEvent ,HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { Injectable,Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CookieProvider } from '../cookie/cookie';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';

import 'rxjs/add/operator/do';

/*
  Generated class for the AuthInterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthInterceptorProvider implements HttpInterceptor {
  static instance:AuthInterceptorProvider;
  navCtrl:NavController;

  constructor(private cookie:CookieProvider) {
    console.log('Hello AuthInterceptorProvider Provider');
    AuthInterceptorProvider.instance = this;
  }

  intercept(request: HttpRequest<any>,next: HttpHandler):Observable<HttpEvent<any>> {
    if(this.cookie.objs.token){
      request = request.clone({
        setHeaders:{
          Authorization: this.cookie.objs.token.token_type+" "+this.cookie.objs.token.access_token
        }
      });
    }

    return next.handle(request);
  }

}
