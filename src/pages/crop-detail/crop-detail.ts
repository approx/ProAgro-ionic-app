import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CropModel } from '../../model/crop.model';
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
  }];

  drawCharts=false;
  pieChartData = [];
  pieChartLabels = [];
  pieChartOptions = {
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
          label += this.currencyPipe.transform(data.datasets[0].data[tooltipItem.index],'BRL');
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
      backgroundColor: ["#4a883f","#4A442D","#58B09C","#3D3522","#CAF7E2","#D5DFE5","#B49594","#C9B1BD","#7F9172","#4E3D42","#9F9F92","#C9D5B5","#E3DBDB","#32021F","#4B2E39","#6F7D8C","#77A0A9","#CACFD6","#D6E5E3","#9FD8CB","#2D3319"]
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

  constructor(public navCtrl: NavController, public navParams: NavParams,private cropProvider:CropProvider,private message:MessagesProvider,private activityProvider:ActivityProvider,private currencyPipe:CurrencyPipe) {

    super(navCtrl);
    MyApp.instance.user;
    this.userClient = MyApp.instance.user.role.id == 3;
  }

  editSack() {
    this.sack_editing = !this.sack_editing;
    this.crop.sack_produced = this.sack_produced;
  }

  indicatorTab(value){
    this.indicators=value;
  }

  calculatePieChartData(){
    let array=[];
    loop1:
    for (let i = 0; i < this.crop.activities.length; i++) {
      for (let j = 0; j < this.pieChartData.length; j++) {
          if(this.pieChartLabels[j]==this.crop.activities[i].activity_type.name){
            this.pieChartData[j]+=parseFloat(<any>this.crop.activities[i].total_value);
            continue loop1;
          }
      }
      this.pieChartData.push(parseFloat(<any>this.crop.activities[i].total_value));
      this.pieChartLabels.push(this.crop.activities[i].activity_type.name);
    }
    // console.log(this.pieChartData);
    // console.log(this.pieChartLabels)
  }

  calculateLineChart(){
    let orderedActivities = this.crop.activities.sort((a,b)=>{
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
      // console.log(orderedActivities[i].operation_date);
      let date = new Date(<string>orderedActivities[i].operation_date);
      console.log(i)
      let label = this.months[date.getMonth()]+'/'+date.getFullYear();
      for (let j = 0; j < this.lineChartLabels.length; j++) {
          if(this.lineChartLabels[j]==label){
            this.lineChartData[j]+=parseFloat(<any>orderedActivities[i].total_value);
            console.log(this.lineChartData[j]);
            continue loop1;
          }
      }
      this.lineChartData.push(parseFloat(<any>orderedActivities[i].total_value));
      this.lineChartLabels.push(label);
    }
    // this.lineChartData=[{data:this.lineChartData,label:''}]
    console.log(this.lineChartData);
    console.log(this.lineChartLabels);
  }

  saveSacks(){
    this.message.Wait();

    this.cropProvider.update(this.crop).subscribe((done)=>{
      this.message.SuccessAlert('Sacas registradas com sucesso!');
      this.sack_editing = !this.sack_editing;
      this.sack_produced = this.crop.sack_produced;
    },(err)=>{
      this.message.ErrorAlert();
    })
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad CropDetailPage');
    this.crop_id = this.navParams.get('crop_id');
    this.crop = this.navParams.get('crop');
    console.log(this.crop)
    if(!this.crop&&this.crop_id){
      this.cropProvider.get(this.crop_id).subscribe((data:CropModel)=>{
        this.crop=data;
        console.log(this.crop);
        this.calculatePercentage();
        this.calculateTotal();
        this.calculateTotalInventario();
        this.calculatePieChartData();
        this.calculateLineChart();
        this.drawCharts=true;
        if (this.crop.sack_produced == null) {
          this.crop.sack_produced = 0;
        }
        this.sack_produced = this.crop.sack_produced;
      });
    }
    else{
      this.calculateTotal();
      this.calculatePercentage();
      this.calculateTotalInventario();
      this.calculatePieChartData();
      this.calculateLineChart();
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
        this.ionViewDidLoad();
      },(err)=>{
        this.message.ErrorAlert();
      })
    })
  }

  calculateTotalInventario(){
    this.itens_total_value = 0;
    this.itens_depreciation_value = 0;
    for (let i = 0; i < this.crop.inventory_itens.length; i++) {
        this.itens_total_value+=this.crop.inventory_itens[i].price;
        this.itens_depreciation_value+=this.crop.inventory_itens[i].depreciation_value;
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
