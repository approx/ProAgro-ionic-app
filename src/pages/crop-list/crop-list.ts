import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CropModel } from '../../model/crop.model';
import { FarmModel } from '../../model/farm.model';
import { CultureModel } from '../../model/culture.model';
import { CropProvider } from '../../providers/crop/crop';
import { FarmProvider } from '../../providers/farm/farm';
import { CultureProvider } from '../../providers/culture/culture';
import { CropDetailPage } from '../../pages/crop-detail/crop-detail';
import { BasePage } from "../base/base";

/**
 * Generated class for the CropListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({segment:'crop/list'})
@Component({
  selector: 'page-crop-list',
  templateUrl: 'crop-list.html',
})
export class CropListPage extends BasePage{

  crops:CropModel[];
  filteredCrops:CropModel[];
  farms:FarmModel[];
  farmFilter:number[]=[];
  cultures:CultureModel[];
  cultureFilter:number[]=[];
  filterText:string='';
  state:string[];
  loaded:boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cropProvider:CropProvider,
    private farmProvider:FarmProvider,
    private cultureProvider:CultureProvider
  ) {
    super(navCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CropListPage');
    this.getFarms();
    this.getCrops();
    this.getCultures();
  }

  find(obj,array):boolean{
    for (let i = 0; i < array.length; i++) {
        if(array[i]==obj){
          return true;
        }
    }
    return false;
  }

  Filter(){
    this.filteredCrops = this.crops.filter((crop:CropModel)=>{
      if(crop.name.toLowerCase().indexOf(this.filterText.toLowerCase())!=-1||this.filterText==''){
        if(this.find(crop.culture.id,this.cultureFilter)||this.cultureFilter.length==0){
          if(this.find(crop.field.farm.id,this.farmFilter)||this.farmFilter.length==0){
            let d = new Date(crop.final_date);
            let now = new Date();

            if(this.find('Finalizado',this.state)&&(now.getTime()>d.getTime())){
              return true;
            }

            if(this.find('Em Andamento',this.state)&&(now.getTime()<d.getTime())){
              return true;
            }

            if(this.state.length==0){
              return true;
            }
          }
        }
      }
      return false;
    });
  }

  openCrop(crop){
    this.navCtrl.push(CropDetailPage.name,{crop:crop,crop_id:crop.id});
  }

  getFarms(){
    this.farmProvider.getAll().subscribe((data:FarmModel[])=>{
      this.farms = data;
      console.log(data);
    });
  }

  getCrops(){
    this.cropProvider.getAll().subscribe((data:CropModel[])=>{
      this.crops = data;
      this.filteredCrops = this.crops;
      console.log(data);
      this.loaded=true;
    })
  }

  getCultures(){
    this.cultureProvider.getAll().subscribe((data:CultureModel[])=>{
      this.cultures = data;
      console.log(data);
    })
  }

}
