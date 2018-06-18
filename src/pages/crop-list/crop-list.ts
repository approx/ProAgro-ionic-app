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
      if((crop.name+' - '+crop.field.name).toLowerCase().indexOf(this.filterText.toLowerCase())!=-1||this.filterText==''){
        return true;
      }
      return false;
    });
    // console.log(this.state)
    this.filteredCrops = this.filteredCrops.filter((crop:CropModel)=>{
      if(this.state){
        let d = new Date(<string>crop.final_date);
        let now = new Date();
        console.log()
        if(this.find('Finalizado',this.state)&&now.getTime()>d.getTime()){
          return true;
        }
        if(this.find('Em Andamento',this.state)&&now.getTime()<d.getTime()){
          return true;
        }
        return false;
      }
      return true;
    });
    this.filteredCrops = this.filteredCrops.filter((crop:CropModel)=>{
      if(this.cultureFilter.length>0){
        if(this.find(crop.culture.name,this.cultureFilter)){
          return true;
        }
        return false;
      }
      return true;
    });
    console.log(this.cultureFilter)
    this.filteredCrops = this.filteredCrops.filter((crop:CropModel)=>{
      console.log(crop.field.farm.id)
      console.log(this.farmFilter)
      if(this.farmFilter){
        if(this.find(crop.field.farm.id,this.farmFilter)){
          return true;
        }
        return false;
      }
      return true;
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
