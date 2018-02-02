import { Component,Input,OnInit } from '@angular/core';
import { CropModel } from '../../model/crop.model'

/**
 * Generated class for the CropInfoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'crop-info',
  templateUrl: 'crop-info.html'
})
export class CropInfoComponent {
  @Input() crop:CropModel;
  percentage:number;

  constructor() {
    console.log('Hello CropInfoComponent Component');
  }

  ngOnInit() {
    this.calculatePercentage();
  }

  calculatePercentage(){
    let initialTime = new Date(this.crop.initial_date).getTime();
    let finalTime = new Date(this.crop.final_date).getTime();

    let timeVariation = finalTime - initialTime;

    let nowVariation = new Date().getTime() - initialTime ;
    console.log(timeVariation)
    nowVariation = Math.max(0,nowVariation);
    console.log(nowVariation)

    this.percentage = (100*nowVariation)/timeVariation;
    console.log(this.percentage)
    this.percentage = Math.min(100,Math.round(this.percentage));
  }

}
