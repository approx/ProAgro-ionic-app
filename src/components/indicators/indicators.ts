import { Component,Input } from '@angular/core';
import { CropModel } from '../../model/crop.model';
import { CurrencyPipe } from '@angular/common';
import { CropProvider } from '../../providers/crop/crop';
import { MyApp } from '../../app/app.component';

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

  coe=0;
  cot=0;
  ct=0;

  coePerSack=0;
  cotPerSack=0;
  ctPerSack=0;

  coePerArea=0;
  cotPerArea=0;
  ctPerArea=0;

  grossMargin=0;
  liquidMargin=0;
  profit=0;

  grossMarginPerSack=0;
  liquidMarginPerSack=0;
  profitPerSack=0;

  grossMarginPerSackExpected=0;
  liquidMarginPerSackExpected=0;
  profitPerSackExpected=0;

  grossMarginPerArea=0;
  liquidMarginPerArea=0;
  profitPerArea=0;

  trcWithField=0;
  trcWithoutField=0;
  lucrativity=0;
  rentability=0;

  pn=0;
  pcot=0;
  pct=0;

  sack_value=30;

  percentage=0.05;

  itens_total_value=0;

  remunaration=0;
  totalRemunaration=0;

  @Input() crop:CropModel;
  coeCotData=[];
  cashPerYear=[];
  produced=[];
  cashPerSack=[];
  cashPerArea=[];
  coeCotCtPerArea=[];
  coeCotCtPerSack=[];
  percentageValues=[];
  pnPcotPctData=[];
  coeCotLabels=['coe','cot','ct'];
  coeCotOptions={
    scales:{
      yAxes:[{
        ticks:{
          beginAtZero: true,
          callback:(value,index)=>{
            return this.currencyPipe.transform(value,this.crop.field.farm.currency_id);
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
          label += this.currencyPipe.transform(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index],this.crop.field.farm.currency_id);
          return label;
        }
      }
    },
    legend: {
      display: true,
      position: 'left'
    }
  };

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

  colors2=[
    { // grey
      backgroundColor: ["#C69C72","#4a883f"]
    },{ // grey
      backgroundColor: ["#433E3F","#4A442D"]
    },
    { // grey
      backgroundColor: ["#8E6E53","#58B09C"]
    }
  ];

  colors3=[
    { // grey
      backgroundColor: ["#3E5622","#4a883f"]
    },{ // grey
      backgroundColor: ["#83781B","#4A442D"]
    },
    { // grey
      backgroundColor: ["#172815","#58B09C"]
    }
  ];

  userClient;



  constructor(private currencyPipe:CurrencyPipe,private cropProvider:CropProvider) {
    console.log('Hello IndicatorsComponent Component');
    this.userClient = MyApp.instance.user.role.id == 3;
  }

  ngOnInit(){
    this.produced=[{data:[this.crop.sack_expected],label:'Expectativa de sacas'},{data:[this.crop.sack_produced],label:'Sacas produzidas'}]
    this.calculateCoeCotCt();
    this.coeCotData = [{data:[this.coe.toFixed(2)],label:'COE'},{data:[this.cot.toFixed(2)],label:'COT'},{data:[this.ct.toFixed(2)],label:'CT'}];
    this.calculateCashPerYear();
    this.calculateCashPerSack();
    this.calculateCashPerArea();
    this.calculateCoeCotCtPerSack();
    this.calculateCoeCotCtPerArea();
    this.calculatePercentageValues();
    this.calculatePnPcotPct();
  }

  update_values(){
    this.cropProvider.update_values(this.crop.id,this.crop.sack_value,this.crop.interest_tax).subscribe(
      (response)=>{},
      (err)=>{}
    );
  }

  calculatePnPcotPct(){
    this.pn = (this.ct - this.coe)/this.grossMarginPerSack;
    this.pcot = this.cot/this.crop.sack_value;
    this.pct = this.ct/this.crop.sack_value;
    this.pnPcotPctData=[
      {data:[this.pn.toFixed(2)],label:'PN'},
      {data:[this.pcot.toFixed(2)],label:'PCOT'},
      {data:[this.pct.toFixed(2)],label:'PCT'}
    ]
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
        this.coe += parseFloat(<any>element.total_value);
      }
    });
  }

  calculateCot(){
    this.cot = this.coe;
    this.crop.activities.forEach((element,index)=>{
      if(element.activity_type.id=='MOF01'){
        this.cot += parseFloat(<any>element.total_value);
      }
    });
    this.crop.inventory_itens.forEach((element,index)=>{
      this.cot += parseFloat(<any>element.depreciation_value) * this.monthsSinceCropStart();
    });
  }

  calculateTotalInventario(){
    this.itens_total_value = 0;
    for (let i = 0; i < this.crop.inventory_itens.length; i++) {
        this.itens_total_value+=parseFloat(<any>this.crop.inventory_itens[i].price);
    }
  }

  calculateCt(){
    this.remunaration = ((this.crop.field.farm.capital_tied*this.crop.interest_tax)/100);
    this.totalRemunaration = this.remunaration * this.monthsSinceCropStart();
    this.ct = this.cot + this.totalRemunaration;
  }

  calculateCashPerYear(){
    this.grossMargin = this.crop.gross_income.total - this.coe;
    this.liquidMargin = this.crop.gross_income.total - this.cot;
    this.profit = this.crop.gross_income.total - this.ct;
    this.cashPerYear = [{data:[this.grossMargin.toFixed(2)],label:'Margem Bruta'},{data:[this.liquidMargin.toFixed(2)],label:'Margem Liquida'},{data:[this.profit.toFixed(2)],label:'Lucro'}];
    console.log(this.cashPerYear)
    // this.grossMargin =
  }

  calculateCashPerSack(){
    if(this.crop.sack_produced>0){
      this.grossMarginPerSack = this.grossMargin / this.crop.sack_produced;
      this.profitPerSack = this.profit / this.crop.sack_produced;
      this.liquidMarginPerSack = this.liquidMargin / this.crop.sack_produced;
      this.cashPerSack=[
        {data:[this.grossMarginPerSack.toFixed(2)],label:'Margem Bruta/sc'},
        {data:[this.liquidMarginPerSack.toFixed(2)],label:'Margem Liquida/sc'},
        {data:[this.profitPerSack.toFixed(2)],label:'Lucro/sc'}
      ]
      console.log(this.cashPerSack);

    }else{
      this.cashPerSack=[
        {data:[0],label:'Margem Bruta/sc'},
        {data:[0],label:'Margem Liquida/sc'},
        {data:[0],label:'Lucro/sc'}
      ]
    }
  }

  calculateCashPerArea(){
    this.grossMarginPerArea = this.grossMargin / this.crop.field.area;
    this.liquidMarginPerArea = this.liquidMargin / this.crop.field.area;
    this.profitPerArea = this.profit / this.crop.field.area;
    this.cashPerArea=[
      {data:[this.grossMarginPerArea.toFixed(2)],label:'Margem Bruta/área'},
      {data:[this.liquidMarginPerArea.toFixed(2)],label:'Margem Liquida/área'},
      {data:[this.profitPerArea.toFixed(2)],label:'Lucro/área'}
    ]
  }

  calculateCoeCotCtPerSack(){
    this.coePerSack = this.coe / this.crop.sack_produced;
    this.cotPerSack = this.cot / this.crop.sack_produced;
    this.ctPerSack = this.ct / this.crop.sack_produced;
    this.coeCotCtPerSack = [
      {data:[this.coePerSack.toFixed(2)],label:'Coe/sc'},
      {data:[this.cotPerSack.toFixed(2)],label:'Cot/sc'},
      {data:[this.ctPerSack.toFixed(2)],label:'Ct/sc'}
    ]
  }

  calculateCoeCotCtPerArea(){
    this.coePerArea = this.coe / this.crop.field.area;
    this.cotPerArea = this.cot / this.crop.field.area;
    this.ctPerArea = this.ct / this.crop.field.area;
    this.coeCotCtPerArea = [
      {data:[this.coePerArea.toFixed(2)],label:'Coe/area'},
      {data:[this.cotPerArea.toFixed(2)],label:'Cot/area'},
      {data:[this.ctPerArea.toFixed(2)],label:'Ct/area'}
    ]
  }

  calculatePercentageValues(){
    this.calculateTotalInventario();
    if(this.itens_total_value!=0){
      this.trcWithoutField = (this.liquidMargin/this.itens_total_value)*100;
    }
    this.trcWithField = (this.liquidMargin/(this.crop.field.farm.capital_tied+this.itens_total_value))*100;
    this.lucrativity = (this.liquidMargin/this.crop.gross_income.total)*100;
    this.rentability = (this.liquidMargin/(this.crop.field.farm.capital_tied+this.itens_total_value))*100;
    this.percentageValues = [
      {data:[this.trcWithoutField.toFixed(2)],label:'TRC sem terra'},
      {data:[this.trcWithField.toFixed(2)],label:'TRC com terra'},
      {data:[this.lucrativity.toFixed(2)],label:'Lucratividade'},
      {data:[this.rentability.toFixed(2)],label:'Rentabilidade'}
    ]
    console.log(this.percentageValues);
  }

  calculateCoeCotCt(){
    this.calculateCoe();
    this.calculateCot();
    this.calculateCt();
  }

}
