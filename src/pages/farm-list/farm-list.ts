import { Component,Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FarmProvider } from '../../providers/farm/farm';
import { FarmModel } from '../../model/farm.model';
import { CultureProvider } from '../../providers/culture/culture';
import { CultureModel } from '../../model/culture.model';
import { ClientProvider } from '../../providers/client/client';
import { ClientModel } from '../../model/client.model';
import { FarmDetailPage } from '../../pages/farm-detail/farm-detail';

/**
 * Generated class for the FarmListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment:'farm/list'
})
@Component({
  selector: 'page-farm-list',
  templateUrl: 'farm-list.html',
})
export class FarmListPage {
  farms:FarmModel[];
  cultures:CultureModel[];
  clients:ClientModel[];
  filteredFarms:FarmModel[];
  @Input() culturesSelected;
  @Input() filterText='';
  @Input() clientFilter;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private farmProvider:FarmProvider,
    private cultureProvider:CultureProvider,
    private clientProvider:ClientProvider
  ) {
    this.getFarms();
    this.getCultures();
    this.getClients();
  }

  FilterFarm(){
    this.filteredFarms = this.farms.filter((farm:FarmModel)=>{
      if(!this.culturesSelected) return true;
      if(this.culturesSelected.length<=0) return true;
      for (let i = 0; i < this.culturesSelected.length; i++) {
        for (let j = 0; j < farm.cultures.length; j++) {
            if(farm.cultures[j].id==this.culturesSelected[i]){
              return true;
            }
        }
      }
      return false;
    });

    this.filteredFarms = this.filteredFarms.filter((farm:FarmModel)=>{
      if(this.filterText=='') return true;
      if(farm.name.toLowerCase().indexOf(this.filterText.toLowerCase())!=-1){
        return true;
      }
      return false;
    });

    this.filteredFarms = this.filteredFarms.filter((farm:FarmModel)=>{
      if(!this.clientFilter) return true;
      if(this.clientFilter.length<=0) return true;
      for (let i = 0; i < this.clientFilter.length; i++) {
        if(farm.client.id==this.clientFilter[i]){
          return true;
        }
      }
      return false;
    });

    console.log(this.farms);
    console.log(this.filteredFarms);
  }

  openFarmPage(farm:FarmModel){
    this.navCtrl.push(FarmDetailPage.name,{farm:farm,farm_id:farm.id});
  }

  getFarms(){
    this.farmProvider.getAll().subscribe((data:FarmModel[])=>{
      this.farms=data;
      this.filteredFarms=this.farms;
      console.log(data);
    })
  }

  getCultures(){
    this.cultureProvider.getAll().subscribe((data:CultureModel[])=>{
      this.cultures=data;
    })
  }

  getClients(){
    this.clientProvider.getAll().subscribe((data:ClientModel[])=>{
      this.clients=data;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmListPage');
  }

}
