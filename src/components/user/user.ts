import { Component,Input } from '@angular/core';
import { endPoint } from "../../Env";
import { HttpClient  } from '@angular/common/http';
import { CookieProvider } from "../../providers/cookie/cookie";
import { NavController,IonicPage} from 'ionic-angular';
import { UserModel } from '../../model/user.model';

/**
 * Generated class for the UserComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'user',
  templateUrl: 'user.html'
})
export class UserComponent {

  text: string;
  @Input() user:UserModel;

  constructor(private http:HttpClient,private cookie:CookieProvider) {
    console.log('Hello UserComponent Component');
  }





}
