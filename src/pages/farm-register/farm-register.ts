import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { AddressInterface } from '../../model/address.model';
import { AddressProvider } from '../../providers/address/address';
import { ClientProvider } from '../../providers/client/client';
import { CultureProvider } from '../../providers/culture/culture';
import { CityProvider } from '../../providers/city/city';
import { StateProvider } from '../../providers/state/state';
import { FarmInterface } from '../../model/farm.model';
import { FarmProvider } from '../../providers/farm/farm';

/**
 * Generated class for the FarmRegisterPage page.
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
  segment: 'farm/register'
})
@Component({
  selector: 'page-farm-register',
  templateUrl: 'farm-register.html',
})
export class FarmRegisterPage {
  cities;
  states;
  clients;
  loader: Loading;
  culturesSelected: Culture[] = [];
  @Input() farm:FarmInterface={
    name:'',
    cultures:''
  };
  @Input() address: AddressInterface = {
    CEP: '',
    street_name: '',
    street_number: '',
    city_id: ''
  };

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
    this.getClients();
    this.getCultures();
    this.getCitiesAndStates();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmRegisterPage');
  }

  getClients() {
    this.clientProvider.getAll().subscribe((data: any) => {
      this.clients = data;
    })
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
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      subTitle: 'Cliente registrado com sucesso!',
      buttons: ['OK']
    });
    alert.present();
  }

  ErrorAlert() {
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
    for (let i = 0; i < this.culturesSelected.length; i++) {
      if(this.culturesSelected[i].selected){
        this.farm.cultures+= (i==0 ? this.culturesSelected[i].id.toString() : ';'+this.culturesSelected[i].id);
      }
    }
    console.log(this.farm.cultures);
  }

  Register() {
    this.Wait();
    this.addressProvider.register(this.address).subscribe((data) => {
      this.farm.address_id=data.id;
      this.farm.cultures='';
      for (let i = 0; i < this.culturesSelected.length; i++) {
        if(this.culturesSelected[i].selected){
          this.farm.cultures+= (i==0 ? this.culturesSelected[i].id.toString() : ';'+this.culturesSelected[i].id);
        }
      }
      this.farmProvider.post(this.farm).subscribe((data)=>{
        this.Done();
      })
    });
  }

}
