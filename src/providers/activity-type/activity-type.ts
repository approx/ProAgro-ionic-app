import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endPoint } from '../../Env';
import { ActivityTypeInterface } from '../../model/activityType.model';

/*
  Generated class for the ActivityTypeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
interface withMethod extends ActivityTypeInterface{
  _method;
}

@Injectable()
export class ActivityTypeProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ActivityTypeProvider Provider');
  }

  getAll():Observable<any>{
    return this.http.get(endPoint+'api/activity_types');
  }

  post(activity_type:ActivityTypeInterface):Observable<any>{
    return this.http.post(endPoint+'api/activity_types',activity_type);
  }

  delete(id:number):Observable<any>{
    return this.http.post(endPoint+'api/activity_type/'+id,{_method:'DELETE'},{responseType:'text'});
  }

  update(activity_type:withMethod):Observable<any>{
    activity_type._method='UPDATE';
    return this.http.post(endPoint+'api/activity_type/'+activity_type.id,activity_type)
  }

}
