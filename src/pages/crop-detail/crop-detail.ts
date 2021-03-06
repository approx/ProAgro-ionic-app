import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CropInterface, CropModel } from '../../model/crop.model';
import { CropProvider } from '../../providers/crop/crop';
import { ActivityRegisterPage } from '../../pages/activity-register/activity-register';
import { ActivityModel } from '../../model/activity.model';
import { ActivityProvider } from '../../providers/activity/activity';
import { ActivityDetailPage } from '../../pages/activity-detail/activity-detail';
import { CropEditPage } from "../crop-edit/crop-edit";
import { CropRegisterSackPage } from "../crop-register-sack/crop-register-sack";
import { BasePage } from "../base/base";
import { MessagesProvider } from '../../providers/messages/messages';
import { CropListPage } from '../crop-list/crop-list';
import { MyApp } from '../../app/app.component';
import { CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { endPoint } from "../../Env";
import { FarmProvider } from '../../providers/farm/farm';
import { StockProvider } from '../../providers/stock/stock';

/**
 * Generated class for the CropDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({segment:'crop/:crop_id'})
@Component({
  selector: 'page-crop-detail',
  templateUrl: 'crop-detail.html',
  providers:[CurrencyPipe]
})
export class CropDetailPage extends BasePage{

  indicators=false;
  crop:CropModel;
  crop_id:number;
  chartData:Array<any>=[];
  percentage:number;
  total_value:number;
  total_value_ha:number=0;
  itens_total_value:number;
  itens_depreciation_value:number;
  sack_editing:boolean=false;
  sack_produced:number;
  userClient:boolean;
  percentage_area:number;

  stocks;

  actions=[{
    label:'Registrar Atividade',
    down:()=>{
      this.navCtrl.push(ActivityRegisterPage.name,{crop:this.crop,crop_id:this.crop.id});
    }
  },{
    label:'Registrar venda de sacas',
    down:()=>{
      this.navCtrl.push(CropRegisterSackPage.name,{crop:this.crop,crop_id:this.crop.id});
    }
  },{
    label:'Atualizar inventario',
    down:()=>{
      this.navCtrl.push('InventoryItenAddPage',{crop:this.crop,crop_id:this.crop.id});
    }
  },{
    label:'Editar Descrição',
    down:()=>{
      this.editDescription=true;
    }
  }];

  drawCharts=false;
  pieChartData = [];
  pieChartLabels = [];
  pieChartOptions = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, data)=> {
          let label = data.labels[tooltipItem.index] || '';
          let total=0;

          for (let i = 0; i < data.datasets[0].data.length; i++) {
              total+=data.datasets[0].data[i];
          }

          if (label) {
            label += ': ';
          }
          label += this.currencyPipe.transform(data.datasets[0].data[tooltipItem.index],this.crop.field.farm.currency_id);
          return label+' '+((data.datasets[0].data[tooltipItem.index]/total)*100).toFixed(2)+'%';
        }
      }
    },
    legend: {
      display: true,
      position: 'left'
    }
  }
  lineChartOptions= {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data)=> {
          var label = data.labels[tooltipItem.index] || '';

          if (label) {
            label += ': ';
          }
          label += this.currencyPipe.transform(data.datasets[0].data[tooltipItem.index],this.crop.field.farm.currency_id);
          return label;
        }
      }
    },
    legend: {
      display: false,
    }
  }

  colors=[
    { // grey
      backgroundColor: ["#4a883f","#4A442D","#58B09C","#EFDD8D","#CAF7E2","#D5DFE5","#B49594","#C9B1BD","#7F9172","#4E3D42","#9F9F92","#C9D5B5","#E3DBDB","#32021F","#4B2E39","#6F7D8C","#77A0A9","#CACFD6","#D6E5E3","#9FD8CB","#2D3319"]
    }
  ];

  linechartColors=[{ // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }]

  months=['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  lineChartData = [];
  lineChartLabels = [];

  activitiesPerCurrency=[];

  grossIncome;
  name="test";

  stockToBeUsed;
  useQuantity;
  useOperationDate;
  usePaymentDate;
  useStockTotal;

  editDescription=false;

  submitStock=()=>{
    this.message.Wait();
    let id = this.stockToBeUsed.id;

    this.stockToBeUsed = undefined;
    this.stockProvider.registerUse({crop_id:this.crop_id,quantity:this.useQuantity,operation_date:this.useOperationDate,payment_date:this.usePaymentDate},id).subscribe((response)=>{
      this.message.SuccessAlert('Atividade cadastrada com sucesso!');
      this.navCtrl.push(CropDetailPage.name,{crop_id:this.crop.id});
    },(err)=>{
      this.message.ErrorAlert();
    });
  }

  submitDescription=()=>{
    this.message.Wait();
    this.editDescription=false;
    this.cropProvider.addedDescription(this.crop.id,this.crop.description).subscribe(
      (response)=>{
        this.message.SuccessAlert('Descrição cadastrada com sucesso!');
        this.navCtrl.push(CropDetailPage.name,{crop_id:this.crop.id});
      },(err)=>{
        this.message.ErrorAlert();
      }

    );
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cropProvider:CropProvider,
    private message:MessagesProvider,
    private activityProvider:ActivityProvider,
    private currencyPipe:CurrencyPipe,
    public http: HttpClient,
    private farmProvider:FarmProvider,
    private stockProvider:StockProvider,
  ) {

    super(navCtrl);
    MyApp.instance.user;
    this.userClient = MyApp.instance.user.role.id == 3;
  }

  selectStock(stock){
    this.stockToBeUsed = stock;
  }

  calculateTotalStock(stock){
    this.useStockTotal = this.currencyPipe.transform(this.useQuantity*stock.unity_value,this.crop.field.farm.currency_id);
  }

  editSack() {
    this.sack_editing = !this.sack_editing;
    this.crop.sack_produced = this.sack_produced;
  }

  // calculateGrossIncome(){
  //   this.grossIncome=0;
  //   this.crop.sack_solds.forEach((element,index)=>{
  //     this.grossIncome+=element.quantity*element.value;
  //   });
  // }

  indicatorTab(value){
    this.indicators=value;
  }

  test(value){
    console.log(value)
  }

  totalValue(activities){
    let total_value=0;
    for (let i = 0; i < activities.length; i++) {
      total_value +=  activities[i].total_value == null ? 0 : parseFloat(activities[i].total_value.toString());
      this.total_value_ha += activities[i].value_per_ha == null ? 0 : parseFloat(activities[i].value_per_ha.toString());
    }
    return total_value;
  }

  totalValueHa(activities){
    let total_value_ha=0;
    for (let i = 0; i < activities.length; i++) {
      total_value_ha += activities[i].value_per_ha == null ? 0 : parseFloat(activities[i].value_per_ha.toString());
    }
    return total_value_ha;
  }

ActivityPerTypeChartData(activities:ActivityModel[]){
  let data=[];
  let labels=[];
  loop1:
  for (let i = 0; i < activities.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if(labels[j]==activities[i].activity_type.group.name && activities[i].activity_type.id!='MOF01'){
        data[j]+=parseFloat(<any>activities[i].total_value);
        continue loop1;
      }
    }
    if(activities[i].activity_type.id!='MOF01'){
      data.push(parseFloat(<any>activities[i].total_value));
      labels.push(activities[i].activity_type.group.name);
    }
  }
  return {data:data,labels:labels};
}

  ActivityPerMonthChartData(activities){
    let data=[];
    let labels=[];
    let orderedActivities = activities.sort((a,b)=>{
      let dateA = new Date(<string>a.operation_date);
      let dateB = new Date(<string>b.operation_date);
      if(dateA.getTime()<dateB.getTime()){
        return -1;
      }
      if(dateA.getTime()>dateB.getTime()){
        return 1;
      }
      if(dateA.getTime()===dateB.getTime()){
        return 0;
      }
    });

    loop1:
    for (let i = 0; i < orderedActivities.length; i++) {

      let date = new Date(<string>orderedActivities[i].operation_date);
      let label = this.months[date.getMonth()]+'/'+date.getFullYear();
      for (let j = 0; j < labels.length; j++) {
          if(labels[j]==label){
            data[j]+=parseFloat(<any>orderedActivities[i].total_value);
            continue loop1;
          }
      }
      data.push(parseFloat(<any>orderedActivities[i].total_value));
      labels.push(label);
    }
    return {data:data,labels:labels};
  }

  separeteActivityPerCurrency(){
    let activities = this.crop.activities;
    loop1:
    for (let i = 0; i < activities.length; i++) {
        activities[i];
        for (let j = 0; j < this.activitiesPerCurrency.length; j++) {
            if(this.activitiesPerCurrency[j][0].currency_id==activities[i].currency_id){
              this.activitiesPerCurrency[j].push(activities[i]);
              continue loop1;
            }
        }
        this.activitiesPerCurrency.push([activities[i]]);
    }
  }

  calculatePieChartData(){
    this.activitiesPerCurrency.forEach((element,index)=>{
      this.pieChartData.push(this.ActivityPerTypeChartData(element));
    });
  }

  calculateLineChart(){
    this.activitiesPerCurrency.forEach((element,index)=>{
      this.lineChartData.push(this.ActivityPerMonthChartData(element));
    });
  }

  formatDate(crop:CropInterface){
    let initial_date = new Date(<string>crop.initial_date);
    let final_date = new Date(<string>crop.final_date);
    crop.initial_date = this.pad(initial_date.getUTCDate())+'/'+(this.pad(initial_date.getUTCMonth()+1))+'/'+initial_date.getFullYear();
    crop.final_date = this.pad(final_date.getUTCDate())+'/'+(this.pad(final_date.getUTCMonth()+1))+'/'+final_date.getFullYear();
  }

  pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
  }

  setDate(){
    if(typeof this.crop.initial_date == 'string'){
      this.crop.initial_date = this.crop.initial_date.split('T')[0];
    }
    if(typeof this.crop.final_date == 'string'){
      this.crop.final_date = this.crop.final_date.split('T')[0];
    }
  }

  saveSacks(){
    this.message.Wait();
    //this.crop.initial_date = this.formatDate(this.crop.initial_date);
    //this.crop.final_date = this.formatDate(this.crop.final_date);
    this.setDate();
    let crop = {...this.crop};
    delete crop.activities;
    delete crop.culture;
    delete crop.field;
    delete crop.gross_income;
    delete crop.sack_solds;
    this.cropProvider.update(<any>crop).subscribe((done)=>{
      this.message.SuccessAlert('Sacas registradas com sucesso!');
      this.sack_editing = !this.sack_editing;
      this.sack_produced = this.crop.sack_produced;
    },(err)=>{
      this.message.ErrorAlert();
    })
  }

  getStocks(){
    this.farmProvider.stocks(this.crop.field.farm.id).subscribe(
      (response)=>{
        this.stocks = response;

      },err=>{

      }
    );
  }

  openRegisterPage(event:MouseEvent){
    event.stopPropagation();
    event.preventDefault();
    this.navCtrl.push(ActivityRegisterPage.name,{crop:this.crop});
  }

  openEditPage(event:MouseEvent){
    event.stopPropagation();
    event.preventDefault();
    this.navCtrl.push(CropEditPage.name,{crop:this.crop,crop_id:this.crop.id});
  }

  openActivityPage(activity){
    this.navCtrl.push(ActivityDetailPage.name,{activity_id:activity.id});
  }

  openActivityEditPage(activity){
    this.navCtrl.push('ActivityEditPage',{activity_id:activity.id,activity:activity});
  }

  deleteIncome(iten){
    this.message.ShowConfirmMessage('Deletar renda','tem certeza que deseja deletar está renda?',()=>{
      this.message.Wait();
      this.http.post(endPoint+'api/'+iten.delete_url,{_method:'DELETE'},{responseType:'text'}).subscribe((response)=>{
        this.message.SuccessAlert('Renda deletada com sucesso!');
        this.navCtrl.push(CropDetailPage.name,{crop_id:this.crop.id});
      },(err)=>{
        this.message.ErrorAlert();
      })
    })
  }

  loadFromService(){
    this.cropProvider.get(this.crop_id).subscribe((data:CropModel)=>{
      this.crop=data;
      this.formatDate(this.crop);
      this.separeteActivityPerCurrency();
      this.calculatePercentage();
      this.calculateTotal();
      this.calculateTotalInventario();
      this.calculatePieChartData();
      this.calculateLineChart();
      this.getStocks();
      this.drawCharts=true;
      if (this.crop.sack_produced == null) {
        this.crop.sack_produced = 0;
      }
      this.sack_produced = this.crop.sack_produced;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CropDetailPage');
    this.crop_id = this.navParams.get('crop_id');
    this.crop = this.navParams.get('crop');
    if(!this.crop&&this.crop_id){
      this.loadFromService()
    }
    else{
      this.separeteActivityPerCurrency();
      this.calculateTotal();
      this.calculatePercentage();
      this.calculateTotalInventario();
      this.calculatePieChartData();
      this.calculateLineChart();
      this.getStocks();
      this.drawCharts=true;
      if (this.crop.sack_produced == null) {
        this.crop.sack_produced = 0;
      }
      this.sack_produced = this.crop.sack_produced;
    }
  }

  delete(){
    this.message.ShowConfirmMessage('Deletar Safra',"tem certeza que deseja deletar está safra? todas as atividades relacionadas a ela também serão deletadas",()=>{
      this.message.Wait();
      this.cropProvider.delete(this.crop.id).subscribe((response)=>{
        this.message.SuccessAlert('Safra deletada com sucesso!');
        this.navCtrl.push(CropListPage.name);
      },(err)=>{
        this.message.ErrorAlert();
      })
    });
  }

  deleteActivity(activity:ActivityModel){
    this.message.ShowConfirmMessage('Deletar atividade','tem certeza que deseja deletar está atividade?',()=>{
      this.message.Wait();
      this.activityProvider.delete(activity.id).subscribe((response)=>{
        this.message.SuccessAlert('Atividade deletada com sucesso!');
        this.navCtrl.push(CropDetailPage.name,{crop_id:this.crop.id});
      },(err)=>{
        this.message.ErrorAlert();
      })
    })
  }

  calculateTotalInventario(){
    this.itens_total_value = 0;
    this.itens_depreciation_value = 0;
    this.percentage_area = this.crop.field.area * 100 / this.crop.field.farm.area_planted;

    for (let i = 0; i < this.crop.inventory_itens.length; i++) {
        this.itens_total_value+=parseFloat(<any>this.crop.inventory_itens[i].price);
        this.itens_depreciation_value+=parseFloat((<any>this.crop.inventory_itens[i].depreciation_value / 100 * this.percentage_area).toString());
    }
  }

  calculateTotal(){
    this.total_value=0;
    this.total_value_ha=0;
    for (let i = 0; i < this.crop.activities.length; i++) {
      this.total_value +=  this.crop.activities[i].total_value == null ? 0 : parseFloat(this.crop.activities[i].total_value.toString());
      this.total_value_ha += this.crop.activities[i].value_per_ha == null ? 0 : parseFloat(this.crop.activities[i].value_per_ha.toString());
    }
  }

  calculatePercentage(){
    let initialTime = new Date(<Date>this.crop.initial_date).getTime();
    let finalTime = new Date(<Date>this.crop.final_date).getTime();
    let timeVariation = finalTime - initialTime;
    let nowVariation = new Date().getTime() - initialTime ;

    nowVariation = Math.max(0,nowVariation);

    this.percentage = (100*nowVariation)/timeVariation;

    this.percentage = Math.min(100,Math.round(this.percentage));
  }

}
