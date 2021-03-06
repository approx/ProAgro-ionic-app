import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FarmModel } from '../../model/farm.model';
import { MyApp } from '../../app/app.component';
import { FarmProvider } from '../../providers/farm/farm';
import { FieldRegisterPage } from '../../pages/field-register/field-register';
import { FieldDetailPage } from '../../pages/field-detail/field-detail';
import { CropRegisterPage } from '../../pages/crop-register/crop-register';
import { InventoryItenRegisterPage } from '../../pages/inventory-iten-register/inventory-iten-register';
import { FarmEditPage } from "../farm-edit/farm-edit";
import { DomSanitizer } from "@angular/platform-browser";
import { InventoryItenSalePage } from "../../pages/inventory-iten-sale/inventory-iten-sale";
import { BasePage } from "../base/base";
import { MessagesProvider } from '../../providers/messages/messages';
import { FarmListPage } from '../farm-list/farm-list';
import { StocksPage } from '../stocks/stocks';
import { CurrencyPipe } from '@angular/common';
import { PropagateActivityPage } from '../propagate-activity/propagate-activity';
import { InventoryItenProvider } from '../../providers/inventory-iten/inventory-iten';

/**
 * Generated class for the FarmDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment:'farm/:farm_id'
})
@Component({
  selector: 'page-farm-detail',
  templateUrl: 'farm-detail.html',
  providers:[CurrencyPipe]
})
export class FarmDetailPage extends BasePage{
  farm_id:number;
  farm:FarmModel;
  userClient:boolean;
  mapUrl;
  userAction=[{
    label:'Indicadores',
    down:()=>{
      this.navCtrl.push('FarmIndicatorsPage',{farm:this.farm,farm_id:this.farm.id});
    }
  }];
  actions=[
  {
    label:'Adicionar Talhão',
    down:()=>{
      console.log('open');
      this.navCtrl.push(FieldRegisterPage.name,{farm:this.farm});
    }
  },
  {
    label:'Adicionar Nova Safra',
    down:()=>{
      this.navCtrl.push(CropRegisterPage.name,{farm:this.farm});
    }
  },
  {
    label:'Registar Venda',
    down:()=>{
      this.navCtrl.push(InventoryItenSalePage.name,{farm:this.farm,farm_id:this.farm.id});
    },
  },{
    label:'Registrar Estoque',
    down:()=>{
      this.navCtrl.push(StocksPage.name,{farm:this.farm,farm_id:this.farm.id});
    },
  },{
    label:'Ratear Atividade',
    down:()=>{
      this.navCtrl.push(PropagateActivityPage.name,{farm:this.farm,farm_id:this.farm.id});
    }
  },{
    label:'Indicadores',
    down:()=>{
      this.navCtrl.push('FarmIndicatorsPage',{farm:this.farm,farm_id:this.farm.id});
    }
  }
];

  total_value:number;
  total_depreciation_value:number;
  total_remunaration:number;

  expensePieChartData = [];
  expensePieChartLabels = [];
  benefitPieChartData=[];
  benefitPirChartLabel=[];
  pieChartOptions = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, data)=> {
          var label = data.labels[tooltipItem.index] || '';

          if (label) {
            label += ': ';
          }
          // console.log(data);
          label += this.currencyPipe.transform(data.datasets[0].data[tooltipItem.index],'BRL');
          return label;
        }
      }
    },
    legend: {
      display: true,
      position:'left'
    }
  }
  drawCharts=false;
  colors=[
    { // grey
      backgroundColor: ["#4a883f","#4A442D","#58B09C","#3D3522","#CAF7E2","#D5DFE5","#B49594","#C9B1BD","#7F9172","#4E3D42","#9F9F92","#C9D5B5","#E3DBDB","#32021F","#4B2E39","#6F7D8C","#77A0A9","#CACFD6","#D6E5E3","#9FD8CB","#2D3319"]
    }
  ]

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private farmProvider:FarmProvider,
      private sanitizer:DomSanitizer,
      private message:MessagesProvider,
      private currencyPipe:CurrencyPipe,
      private inventoryItenProvider:InventoryItenProvider
  ) {
    super(navCtrl);
    MyApp.instance.user;
    this.userClient = MyApp.instance.user.role.id == 3;
  }

  getIncomeType(){

  }

  openInventoryEditPage(iten){
      this.navCtrl.push('InventaryItenEditPage',{iten_id:iten.id});
  }

  openFieldPage(field){
    this.navCtrl.push(FieldDetailPage.name,{field_id:field.id});
  }

  openFieldRegister(event:MouseEvent){
    event.preventDefault();
    event.stopPropagation();
    this.navCtrl.push(FieldRegisterPage.name,{farm:this.farm});
  }

  openEditPage(event:MouseEvent){
    event.preventDefault();
    event.stopPropagation();
    this.navCtrl.push(FarmEditPage.name,{farm:this.farm,farm_id:this.farm.id});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmDetailPage');
    this.farm_id = this.navParams.get('farm_id');
    this.farm = this.navParams.get('farm');
    if(!this.farm&&this.farm_id){
      this.farmProvider.get(this.farm_id).subscribe((data:FarmModel)=>{
        this.farm=data;
        console.log(this.farm);
        this.calculateTotal();
        this.setMapUrl();
        // this.calculateDataChart();
      });
    }
    else{
      this.setMapUrl();
      this.calculateTotal();
      // this.calculateDataChart();
    }
  }

  deletePropagated(id){
    this.message.ShowConfirmMessage('Deletar Atividades rateadas',"tem certeza que deseja deletar estas atividade?",()=>{
      this.message.Wait();
      this.farmProvider.deletePropagated(id).subscribe((response)=>{
        this.message.SuccessAlert('Atividades rateadas deletadas com suscesso');
        this.navCtrl.push('FarmDetailPage',{farm_id:this.farm.id});
      },(err)=>{
        this.message.ErrorAlert();
      })
    });
  }

  deleteInventoryItem(item){
    this.message.ShowConfirmMessage('Deletar item do inventorio',"tem certeza que deseja deletar esté item? depois não será possivel recuperar este item e suas ligações com as safras",()=>{
      this.message.Wait();
      this.inventoryItenProvider.delte(item.id).subscribe((response)=>{
        this.message.SuccessAlert('Item deletado com suscesso');
        this.navCtrl.push('FarmDetailPage',{farm_id:this.farm.id});
      },(err)=>{
        this.message.ErrorAlert();
      })
    });
  }

  delete(){
    this.message.ShowConfirmMessage('Deletar Fazenda',"tem certeza que deseja deletar esta fazenda? todas as atividades,safras e talhões relacionadas a ela também serão deletados",()=>{
      this.message.Wait();
      this.farmProvider.delete(this.farm.id).subscribe((response)=>{
        this.message.SuccessAlert('Fazenda deletada com sucesso!');
        this.navCtrl.push(FarmListPage.name);
      },(err)=>{
        this.message.ErrorAlert();
      })
    });
  }

  diffInMonths(d1:Date,d2:Date){
    let yearsdiff = Math.abs(d1.getFullYear()-d2.getFullYear());
    let monthdiff = Math.abs(d1.getMonth()-d2.getMonth());

    return (yearsdiff*12)+monthdiff;
  }

  setMapUrl(){
    if(this.farm.lat&&this.farm.lng){
      this.mapUrl="https://www.google.com/maps/embed/v1/place?key=AIzaSyBocEdaAefVaBdvmzmN7yUudqb0l9yyQ-U&q="+this.farm.lat+","+this.farm.lng+"&maptype=satellite";
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.mapUrl);
    }
    console.log('changed')
  }

  calculateTotal(){
    let monthDiff = this.diffInMonths(new Date(this.farm.created_at),new Date());
    this.total_remunaration = monthDiff * this.farm.remuneration;
    this.total_value = parseFloat(this.farm.capital_tied.toString())+parseFloat(this.total_remunaration.toString());
    this.total_depreciation_value = 0;
    if(this.farm.inventory_itens.length>0){
      for (let i = 0; i < this.farm.inventory_itens.length; i++) {
          this.total_value+=parseFloat(this.farm.inventory_itens[i].price.toString());
          this.total_depreciation_value+=parseFloat(this.farm.inventory_itens[i].depreciation_value.toString());
      }
    }
    this.total_depreciation_value = Math.round(this.total_depreciation_value*100)/100;
    this.total_value = Math.round(this.total_value*100)/100;
  }

  openRegisterInventory(event:MouseEvent){
    event.preventDefault();
    event.stopPropagation();
    this.navCtrl.push(InventoryItenRegisterPage.name,{farm:this.farm});
  }

  ionViewCanEnter(): boolean{
    return MyApp.instance.loged;
  }

}
