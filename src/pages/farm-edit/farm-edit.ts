import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { AddressInterface, AddressModel } from '../../model/address.model';
import { AddressProvider } from '../../providers/address/address';
import { ClientProvider } from '../../providers/client/client';
import { CultureProvider } from '../../providers/culture/culture';
import { CityProvider } from '../../providers/city/city';
import { StateProvider } from '../../providers/state/state';
import { FarmInterface, FarmModel } from '../../model/farm.model';
import { FarmProvider } from '../../providers/farm/farm';
import { ClientModel } from '../../model/client.model';
import { BasePage } from "../base/base";

/**
 * Generated class for the FarmEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 interface Culture {
   id: number;
   name: string;
   selected: boolean;
 }

@IonicPage({
  segment:'farm/:farm_id/edit'
})
@Component({
  selector: 'page-farm-edit',
  templateUrl: 'farm-edit.html',
})
export class FarmEditPage extends BasePage{

  cities;
  states;
  clients;
  loaded:boolean=false;
  loader: Loading;
  culturesSelected: Culture[] = [];
  @Input() farm:FarmInterface={
    name:'',
    cultures:''
  };
  @Input() address: AddressInterface = {
    CEP: '',
    street_name: '',
    street_number: ''
  };
  value_ha;
  capital_tied;
  remuneration;
  getedCultures;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private stateProvider: StateProvider,
    private cityProvider: CityProvider,
    private clientProvider: ClientProvider,
    private addressProvider: AddressProvider,
    private cultureProvider: CultureProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private farmProvider:FarmProvider
  ) {
    super(navCtrl);
  }

  getFarm(){
    let farm = this.navParams.get('farm');
    if(!farm){
      this.farmProvider.get(this.navParams.get('farm_id')).subscribe((data:FarmModel)=>{
        this.setFarm(data);
      })
    }
    else{
      this.setFarm(farm);
    }
  }

  setFarm(farm){
    this.farm.id = farm.id;
    this.farm.name = farm.name;
    this.farm.capital_tied = farm.capital_tied;
    this.farm.client_id = farm.client.id;
    this.address = farm.address;
    this.address.city_id = (<AddressModel>this.address).city.id;
    this.address.state_id = (<AddressModel>this.address).city.state.id;
    this.farm.ha = farm.ha;
    this.onHectarValueChange(farm.value_ha.toString());
    this.getedCultures = farm.cultures;
    this.findInCultures();
    this.loaded = true;
  }

  findInCultures(){
    if(this.getedCultures&&this.culturesSelected.length>0){
      for (let i = 0; i < this.getedCultures.length; i++) {
          for (let j = 0; j < this.culturesSelected.length; j++) {
              if(this.getedCultures[i].id==this.culturesSelected[j].id){
                this.culturesSelected[j].selected=true;
              }
          }
      }
    }
  }

  onHectarValueChange($event:any){
    let value:string = $event;
    value = value.replace(/(?=[^,])(\D)+/gi,'');
    this.farm.value_ha = parseFloat(value);
    setTimeout(()=>{
      this.value_ha = value.length>0 ? 'R$ '+value: '';
    },0);
    this.calculateValues();
  }

  calculateValues(){
    if(this.farm.value_ha && this.farm.ha){
      this.farm.capital_tied = this.farm.ha * this.farm.value_ha;
      this.capital_tied = 'R$ ' + this.farm.capital_tied;
      this.farm.remuneration = (this.farm.capital_tied*.5)/100;
      this.remuneration = 'R$ ' + this.farm.remuneration;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmRegisterPage');
    this.getClients();
    this.getCultures();
    this.getCitiesAndStates();
    this.getFarm();
  }

  getClients() {
    this.clientProvider.getAll().subscribe((data: any) => {
      this.clients = data;
    });
  }

  Wait() {
    this.loader = this.loadingCtrl.create({
      content: "Registrando..."
    });
    this.loader.present();
  }

  Done() {
    this.loader.dismiss();
  }

  SuccessAlert() {
    this.Done();
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      subTitle: 'Fazenda registrada com sucesso!',
      buttons: ['OK']
    });
    alert.present();
  }

  ErrorAlert() {
    this.Done();
    let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: 'Algum erro inesperdado ocorreu, tente novamente!',
      buttons: ['OK']
    });
    alert.present();
  }

  getCultures() {
    this.cultureProvider.getAll().subscribe((data: any) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        this.culturesSelected.push({ id: data[i].id, name: data[i].name, selected: false });
      }
      this.findInCultures();
    })
  }

  getCitiesAndStates() {
    this.cityProvider.getAll().subscribe((data: any) => {
      this.cities = data;
      console.log(this.cities);
    }, (err: any) => {
      if (err instanceof Error) {

      }
      else {
        console.log(err.status);
      }
    });

    this.stateProvider.getAll().subscribe((data: any) => {
      this.states = data;
    }, (err: any) => {
      if (err instanceof Error) { }
      else { }
    })
  }

  showNumber(){
    this.farm.cultures='';
    let insertIndex=0;
    for (let i = 0; i < this.culturesSelected.length; i++) {
      if(this.culturesSelected[i].selected){
        this.farm.cultures+= (insertIndex==0 ? this.culturesSelected[i].id.toString() : ';'+this.culturesSelected[i].id);
        insertIndex++;
      }
    }
  }

  setCultureToSend(){
    let insertIndex=0;
    for (let i = 0; i < this.culturesSelected.length; i++) {
      if(this.culturesSelected[i].selected){
        this.farm.cultures+= (insertIndex==0 ? this.culturesSelected[i].id.toString() : ';'+this.culturesSelected[i].id);
        insertIndex++;
      }
    }
  }

  Update() {
    this.Wait();
    this.addressProvider.update(this.address).subscribe((data)=>{
      this.setCultureToSend();
      this.farmProvider.update(this.farm).subscribe((data)=>{
      this.SuccessAlert();
      },(err)=>{this.ErrorAlert()})
    },(err)=>{this.ErrorAlert()})
  }
}
