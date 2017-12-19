import { HttpClient  } from '@angular/common/http';
import { endPoint } from "../Env";

import { Observable } from 'rxjs/Observable';

export class StateModel{

  constructor(
    public id:number,
    public name:string,
    private http:HttpClient
  ){}

}
