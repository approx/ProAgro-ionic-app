import { Component,Input } from '@angular/core';
import { CropModel } from '../../model/crop.model';
import { CurrencyPipe } from '@angular/common';

/**
 * Generated class for the IndicatorsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'indicators',
  templateUrl: 'indicators.html'
})
export class IndicatorsComponent {

  coe;
  cot;
  ct;

  @Input() crop:CropModel;
  coeCotData;
  coeCotLabels=['coe','cot','ct'];
  coeCotOptions={
    tooltips: {
      callbacks: {
        label: (tooltipItem, data)=> {
          var label = data.labels[tooltipItem.index] || '';

          if (label) {
            label += ': ';
          }
          label += this.currencyPipe.transform(data.datasets[0].data[tooltipItem.index],'BRL');
          return label;
        }
      }
    }
  };
  colors=[
    { // grey
      backgroundColor: ["#4a883f","#4A442D","#58B09C","#3D3522","#CAF7E2","#D5DFE5","#B49594","#C9B1BD","#7F9172","#4E3D42","#9F9F92","#C9D5B5","#E3DBDB","#32021F","#4B2E39","#6F7D8C","#77A0A9","#CACFD6","#D6E5E3","#9FD8CB","#2D3319"]
    }
  ];

  constructor(private currencyPipe:CurrencyPipe) {
    console.log('Hello IndicatorsComponent Component');
  }

  ngOnInit(){
    this.calculateCoeCotCt();
    this.coeCotData = [this.coe.toFixed(2),this.cot.toFixed(2)];

  }

  monthsSinceCropStart(){
    let initialTime = new Date(<Date>this.crop.initial_date).getTime();
    let finalTime = new Date(<Date>this.crop.final_date).getTime();
    let monthsInitialNow;

    let initial = new Date(<Date>this.crop.initial_date);
    let now = new Date()
    monthsInitialNow = (now.getFullYear() - initial.getFullYear()) * 12;
    monthsInitialNow -= initial.getMonth() + 1;
    monthsInitialNow += now.getMonth()+1;
    monthsInitialNow = monthsInitialNow <= 0 ? 0 : monthsInitialNow;

    let monthsInitialFinal;

    let finatDate = new Date(<Date>this.crop.final_date);
    monthsInitialFinal = (finatDate.getFullYear() - initial.getFullYear()) * 12;
    monthsInitialFinal -= initial.getMonth() + 1;
    monthsInitialFinal += finatDate.getMonth()+1;
    monthsInitialFinal = monthsInitialFinal <= 0 ? 0 : monthsInitialFinal;

    return Math.min(monthsInitialNow,monthsInitialFinal);

  }

  calculateCoe(){
    this.coe = 0;
    this.crop.activities.forEach((element,index)=>{
      if(element.activity_type.id!='MOF01'){
        this.coe += element.total_value;
      }
    });
  }

  calculateCot(){
    this.cot = this.coe;
    this.crop.activities.forEach((element,index)=>{
      if(element.activity_type.id=='MOF01'){
        this.cot += element.total_value;
      }
    });
    this.crop.inventory_itens.forEach((element,index)=>{
      this.cot += element.depreciation_value * this.monthsSinceCropStart();
    });
  }

  calculateCoeCotCt(){
    this.calculateCoe();
    this.calculateCot();
  }

}
