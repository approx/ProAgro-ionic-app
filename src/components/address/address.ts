import { Component,Input } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { AddressInterface,AddressModel } from '../../model/address.model';
import { CityModel,CityInterface } from '../../model/city.model';

/**
 * Generated class for the AddressComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'address',
  templateUrl: 'address.html'
})
export class AddressComponent {
  private _address:AddressModel;
  get address():AddressModel{
    return this._address;
  }
  @Input() set address(address:AddressModel){
    this._address=address;
    this.getCity();
  };
  state;
  city;

  getCity(){
    this._address.getCity().subscribe((data:CityInterface)=>{
      this.city=CityModel.CreateFromInterface(data,this.http);
      this.city.getState().subscribe((data:any)=>{
        this.state=data;
      },(err:any)=>{
        if(err instanceof Error){

        }else{

        }
      })
    },(err:any)=>{
      if(err instanceof Error){

      }else{

      }
    });
  }

  constructor(private http:HttpClient) {
    console.log('Hello AddressComponent Component');

  }

}
