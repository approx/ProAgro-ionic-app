import { Component,Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { IndicatorsProvider,IndicatorsData } from '../../providers/indicators/indicators';

/**
 * Generated class for the FarmIndicatorsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'farm-indicators',
  templateUrl: 'farm-indicators.html'
})
export class FarmIndicatorsComponent {

  text: string;
  @Input() fields;

  coeCotData;
  showGraphs=false;
  interest_rate=0.05;

  colors=[
    { // grey
      backgroundColor: ["#4a883f","#4a883f"]
    },{ // grey
      backgroundColor: ["#4A442D","#4A442D"]
    },
    { // grey
      backgroundColor: ["#58B09C","#58B09C"]
    },
    { // grey
      backgroundColor: ["#C69C72","#4a883f"]
    }
  ];

  coeCotOptions={
    scales:{
      yAxes:[{
        ticks:{
          beginAtZero: true,
          callback:(value,index)=>{
            return this.currencyPipe.transform(value,'BRL');
          }
        }
      }],
      xAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data)=> {
          var label = data.labels[tooltipItem.index] || '';
          console.log(tooltipItem);
          if (label) {
            label += ': ';
          }
          label += this.currencyPipe.transform(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index],'BRL');
          return label;
        }
      }
    },
    legend: {
      display: true,
      position: 'left'
    }
  };

  constructor(private currencyPipe:CurrencyPipe,private indicatorsProvider:IndicatorsProvider) {
    console.log('Hello FarmIndicatorsComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit(){
    console.log(this.fields);
    let ids='';
    this.fields.forEach(field=>{
      if(field.selected){
        ids+=field.selectedCrop.id+';';
      }
    });
    ids = ids.slice(0, -1);
    console.log(ids);
    this.indicatorsProvider.getIdicators(ids,this.interest_rate).then((indicators:IndicatorsData)=>{
      this.showGraphs=true;
      this.coeCotData = [{data:[indicators.coe.toFixed(2)],label:'COE'},{data:[indicators.cot.toFixed(2)],label:'COT'},{data:[indicators.ct.toFixed(2)],label:'CT'}];
    });
  }

}
