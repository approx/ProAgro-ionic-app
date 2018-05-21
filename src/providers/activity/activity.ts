import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endPoint } from '../../Env';
import { ActivityInterface } from '../../model/activity.model'

interface ActivityUpdate extends ActivityInterface{
  _method?:string;
}

/*
  Generated class for the ActivityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ActivityProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ActivityProvider Provider');
  }

  getAll():Observable<any>{
    return this.http.get(endPoint+'api/activities');
  }

  get(id):Observable<any>{
    return this.http.get(endPoint+'api/activity/'+id);
  }

  save(activity:ActivityInterface):Observable<any>{
    return this.http.post(endPoint+'api/activities',activity);
  }

  saveMultiple(activity):Observable<any>{
    return this.http.post(endPoint+'api/multiple-activities',activity,{responseType: 'text'});
  }

  savePercentageSizeMultiple(activity):Observable<any>{
    return this.http.post(endPoint+'api/percentage-multiple-activities',activity,{responseType: 'text'});
  }

  delete(id):Observable<any>{
    return this.http.post(endPoint+'api/activity/'+id,{_method:'DELETE'},{responseType: 'text'});
  }

  update(activity:ActivityUpdate):Observable<any>{
    activity._method='PUT';
    return this.http.post(endPoint+'api/activity/'+activity.id,activity);
  }

}
