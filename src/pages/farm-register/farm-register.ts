import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { AddressInterface } from '../../model/address.model';
import { ClientProvider } from '../../providers/client/client';
import { CultureProvider } from '../../providers/culture/culture';
import { FarmInterface } from '../../model/farm.model';
import { FarmProvider } from '../../providers/farm/farm';
import { ClientModel } from '../../model/client.model';
import { DomSanitizer } from "@angular/platform-browser";
import { BasePage } from "../base/base";
import { MyApp } from '../../app/app.component';
import { FarmListPage } from '../../pages/farm-list/farm-list';
import { CurrenciesProvider } from '../../providers/currencies/currencies';

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
export class FarmRegisterPage extends BasePage{

  clients;
  loader: Loading;
  culturesSelected: Culture[] = [];
  @Input() farm:FarmInterface={
    name:'',
    cultures:'',
    currency_id:'BRL'
  };
  @Input() address:AddressInterface={
    CEP:'',
    street_name:'',
    street_number:'',
    city:'',
    state:'',
    country:''
  };
  value_ha;
  capital_tied;
  remuneration;
  mapUrl;
  currencies;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private clientProvider: ClientProvider,
    private cultureProvider: CultureProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private farmProvider:FarmProvider,
    private sanitizer:DomSanitizer,
    private curreciesProvider:CurrenciesProvider
  ) {
    super(navCtrl);
  }

  ionViewWillEnter(){
    if (MyApp.instance.user.role.id == 3) {
      console.log('sem permissão');
      this.navCtrl.push(FarmListPage.name)
      //window.history.back();
    } else {
      console.log('user passou: ' + MyApp.instance.user.role.id);
    }
  }

  setParamsItens(){
    let client:ClientModel = this.navParams.get('client');
    if(client){
      this.farm.client_id = client.id;
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
      // this.capital_tied = 'R$ ' + this.farm.capital_tied;
      // this.farm.remuneration = (this.farm.capital_tied*.5)/100;
      // this.remuneration = 'R$ ' + this.farm.remuneration;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmRegisterPage');
    this.getClients();
    this.getCultures();
    this.setParamsItens();
    this.getCurrencies();
  }

  getCurrencies(){
    this.curreciesProvider.getAll().subscribe(
      (response)=>{
        this.currencies = response;
      },(err)=>{}
    );
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
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      subTitle: 'Fazenda registrada com sucesso!',
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

  setMapUrl(){
    if(this.farm.lat&&this.farm.lng){
      this.mapUrl="https://www.google.com/maps/embed/v1/place?key=AIzaSyBocEdaAefVaBdvmzmN7yUudqb0l9yyQ-U&q="+this.farm.lat+","+this.farm.lng+"&maptype=satellite";
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.mapUrl);
    }
    console.log('changed')
  }

  Register() {
    this.Wait();
    this.farm.cultures='';
    let insertIndex=0;
    for (let i = 0; i < this.culturesSelected.length; i++) {
      if(this.culturesSelected[i].selected){
        this.farm.cultures+= (insertIndex==0 ? this.culturesSelected[i].id.toString() : ';'+this.culturesSelected[i].id);
        insertIndex++;
      }
    }
    this.farmProvider.post(this.farm).subscribe((data)=>{
      this.Done();
      this.SuccessAlert();
    },(err)=>{
      this.Done();
      this.ErrorAlert();
    });
  }

}
