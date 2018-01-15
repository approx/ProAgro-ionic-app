import { Component,Input } from '@angular/core';
import { AddressModel } from '../../model/address.model';
import { DomSanitizer} from '@angular/platform-browser';

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
  // private _address:AddressModel;
  // get address():AddressModel{
  //   return this._address;
  // }
  // @Input() set address(address:AddressModel){
  //   this._address=address;
  // };

  private _address:AddressModel;

  @Input() set address(address:AddressModel){
    this._address=address;
    this.setMapUrl();
  }

  get address():AddressModel{
    return this._address;
  }

  @Input() showMap:boolean;

  mapUrl;
  constructor(private sanitizer:DomSanitizer) {
    console.log('Hello AddressComponent Component');
  }

  setMapUrl(){
    this.mapUrl="https://www.google.com/maps/embed/v1/place?key=AIzaSyBocEdaAefVaBdvmzmN7yUudqb0l9yyQ-U&q="+this.address.street_name+"+"+this.address.street_number+","+this.address.city.name+"+"+this.address.city.state.name;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.mapUrl);
  }

}
