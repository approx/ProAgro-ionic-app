import { Component,Input,OnInit } from '@angular/core';
import { FarmModel } from '../../model/farm.model';

/**
 * Generated class for the FarmInfoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'farm-info',
  templateUrl: 'farm-info.html'
})
export class FarmInfoComponent implements OnInit{

  @Input() farm:FarmModel;
  text:string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus rhoncus vulputate ligula, sed ullamcorper ex aliquet aliquam.';
  total_value:number;


  constructor() {
    console.log('Hello FarmInfoComponent Component');
  }

  ngOnInit(){
    this.calculateTotal();

  }

  calculateTotal(){
    this.total_value = this.farm.capital_tied;
    if(this.farm.inventory_itens.length>0){
      for (let i = 0; i < this.farm.inventory_itens.length; i++) {
          this.total_value+=this.farm.inventory_itens[i].price;
      }
    }
    this.total_value = Math.round(this.total_value*100)/100;
  }

}
