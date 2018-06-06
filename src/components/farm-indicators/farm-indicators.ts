import { Component,Input,IterableDiffer } from '@angular/core';
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
export class FarmIndicatorsComponent  {

  text: string;
  @Input() fields;
  @Input() reload;

  coeCotData;
  cashPerYear;
  cashPerSack;
  cashPerArea;
  coeCotCtPerSack;
  coeCotCtPerArea;
  percentageValues;
  sackValues;
  indicators;
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

  percentageOption={
    scales:{
      yAxes:[{
        ticks:{
          beginAtZero: true,
          callback:(value,index)=>{
            return value+'%';
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
          label +=data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]+'%';
          return label;
        }
      }
    },
    legend: {
      display: true,
      position: 'left'
    }
  };

  pnPcotPctOption={
    scales:{
      yAxes:[{
        ticks:{
          beginAtZero: true,
          callback:(value,index)=>{
            return value+' sc';
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
          label +=data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]+' sc';
          return label;
        }
      }
    },
    legend: {
      display: true,
      position: 'left'
    }
  };

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
    this.getIndicators();
  }

  getIndicators(fields?:any){
    if(fields){
      this.fields = fields;
    }
    let ids='';
    this.fields.forEach(field=>{
      if(field.selected){
        ids+=field.selectedCrop.id+';';
      }
    });
    ids = ids.slice(0, -1);
    console.log(ids);
    this.indicatorsProvider.getIdicators(ids,this.interest_rate).then((indicators:IndicatorsData)=>{
      this.indicators = indicators;
      this.showGraphs=true;
      this.coeCotData = [{data:[indicators.coe.toFixed(2)],label:'COE'},{data:[indicators.cot.toFixed(2)],label:'COT'},{data:[indicators.ct.toFixed(2)],label:'CT'}];
      this.cashPerYear = [{data:[indicators.grossMargin.toFixed(2)],label:'Margem Bruta'},{data:[indicators.liquidMargin.toFixed(2)],label:'Margem Liquida'},{data:[indicators.profit.toFixed(2)],label:'Lucro'}]
      this.cashPerSack = [{data:[indicators.grossMarginPerSack.toFixed(2)],label:'Margem Bruta/sc'},{data:[indicators.liquidMarginPerSack.toFixed(2)],label:'Margem Liquida/sc'},{data:[indicators.profitPerSack.toFixed(2)],label:'Lucro/sc'}]
      this.cashPerArea = [{data:[indicators.grossMarginPerArea.toFixed(2)],label:'Margem Bruta/área'},{data:[indicators.liquidMarginPerArea.toFixed(2)],label:'Margem Liquida/área'},{data:[indicators.profitPerArea.toFixed(2)],label:'Lucro/área'}]
      this.coeCotCtPerSack = [{data:[indicators.coePerSack.toFixed(2)],label:'COE/sc'},{data:[indicators.cotPerSack.toFixed(2)],label:'COT/sc'},{data:[indicators.ctPerSack.toFixed(2)],label:'CT/sc'}];
      this.coeCotCtPerArea = [{data:[indicators.coePerArea.toFixed(2)],label:'COE/área'},{data:[indicators.cotPerArea.toFixed(2)],label:'COT/área'},{data:[indicators.ctPerArea.toFixed(2)],label:'CT/área'}];
      this.percentageValues = [{data:[indicators.trcWithoutField.toFixed(2)],label:'TRC sem terra'},{data:[indicators.trcWithField.toFixed(2)],label:'TRC com Terra'},{data:[indicators.lucrativity.toFixed(2)],label:'Lucratividade'},{data:[indicators.rentability.toFixed(2)],label:'Rentabilidade'}];
      this.sackValues = [{data:[indicators.pn.toFixed(2)],label:'PN'},{data:[indicators.pcot.toFixed(2)],label:'pcot'},{data:[indicators.pct.toFixed(2)],label:'PCT'}];
    });
  }

}
