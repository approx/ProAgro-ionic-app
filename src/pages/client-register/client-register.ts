import { Component,Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClientInteface } from '../../model/client.model';
import { CityProvider } from '../../providers/city/city';
import { StateProvider } from '../../providers/state/state';
import { Observable } from 'rxjs/Observable';
import { AddressInterface } from '../../model/address.model';
import { AddressProvider } from '../../providers/address/address';
import { ClientProvider } from '../../providers/client/client';
import { LoadingController,Loading,AlertController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';

/**
 * Generated class for the ClientRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client-register',
  templateUrl: 'client-register.html',
})
export class ClientRegisterPage {

  cities:any;
  states:any;
  loader:Loading;
  @Input() client:ClientInteface={
    name:'',
    phone:'',
    inscription_number:'',
    cpf_cnpj:''
  };

  @Input() address:AddressInterface={
    CEP:'',
    street_name:'',
    street_number:'',
    city_id:''
  };


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private stateProvider:StateProvider,
    private cityProvider:CityProvider,
    private addressProvider:AddressProvider,
    public loadingCtrl: LoadingController,
    private clientProvider:ClientProvider,
    private alertCtrl:AlertController
  ) {
    this.cityProvider.getAll().subscribe((data:any)=>{
      this.cities=data;
      console.log(this.cities);
    },(err:any)=>{
      if(err instanceof Error){

      }
      else{
        console.log(err.status);
      }
    });

    this.stateProvider.getAll().subscribe((data:any)=>{
      this.states=data;
    },(err:any)=>{
      if(err instanceof Error){}
      else{}
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientRegisterPage');
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

  Register(){
    this.presentLoading();
    this.addressProvider.register(this.address).subscribe((data:any)=>{
      this.client.address_id =  data.id;
      this.client.user_id = MyApp.instance.user.id;
      this.clientProvider.Register(this.client).subscribe((data:any)=>{
        this.dismisLoader();
        this.SuccessAlert();
      },(err:any)=>{
        this.dismisLoader();
        this.ErrorAlert();
        if(err instanceof Error){

        }else if(err.status==401){
        }
      });
    },(err:any)=>{
      this.dismisLoader();
      this.ErrorAlert();
      if(err instanceof Error){

      }else if(err.status==401){
      }
    })
    console.log(this.address);
    console.log(this.client);
  }

  presentLoading() {
   this.loader = this.loadingCtrl.create({
     content: "Registrando..."
   });
   this.loader.present();
   setTimeout(()=>{this.dismisLoader()},3000);
 }

 dismisLoader(){
   this.loader.dismiss();
 }

}
