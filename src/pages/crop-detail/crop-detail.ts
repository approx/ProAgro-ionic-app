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
import { ChartsModule } from 'ng2-charts';
import { BasePage } from "../base/base";
import { MessagesProvider } from '../../providers/messages/messages';
import { CropListPage } from '../crop-list/crop-list';

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
})
export class CropDetailPage extends BasePage{

  crop:CropModel;
  crop_id:number;
  chartData:Array<any>=[];
  percentage:number;
  total_value:number;
  total_value_ha:number=0;
  itens_total_value:number;
  itens_depreciation_value:number;
  actions=[{
    label:'Registrar Atividade',
    down:()=>{
      this.navCtrl.push(ActivityRegisterPage.name,{crop:this.crop});
    }
  },{
    label:'Registrar venda de sacas',
    down:()=>{
      this.navCtrl.push(CropRegisterSackPage.name,{crop:this.crop,crop_id:this.crop.id});
    }
  }]

  chartLabels = ['January', 'February', 'Mars', 'April'];

  chartOptions = {
    responsive: true
  };


  constructor(public navCtrl: NavController, public navParams: NavParams,private cropProvider:CropProvider,private message:MessagesProvider,private activityProvider:ActivityProvider,) {
    super(navCtrl);
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
        this.setChartData();
      });
    }
    else{
      this.calculateTotal();
      this.calculatePercentage();
      this.calculateTotalInventario();
      this.setChartData();
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
        this.message.SuccessAlert('Atividade deletada com sucesso!',()=>{
          this.ionViewDidLoad();
        });
      },(err)=>{
        this.message.ErrorAlert();
      })
    })
  }

  setChartData(){
    let total_sacks = 0;
    for (let i = 0; i < this.crop.sack_solds.length; i++) {
        total_sacks+=this.crop.sack_solds[i].quantity;
    }
    // this.chartData = [
    //   {data:this.crop.expected,label:'Experado'},
    //   {data:total_sacks,label:'Alcançado'}
    // ]
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
