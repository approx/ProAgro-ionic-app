import { Component,Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClientInteface, ClientModel } from '../../model/client.model';
import { CityProvider } from '../../providers/city/city';
import { StateProvider } from '../../providers/state/state';
import { AddressInterface } from '../../model/address.model';
import { AddressProvider } from '../../providers/address/address';
import { ClientProvider } from '../../providers/client/client';
import { LoadingController,Loading,AlertController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { MessagesProvider } from '../../providers/messages/messages';
import { BasePage } from "../base/base";

/**
 * Generated class for the ClientEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment:'client/:client_id/edit'
})
@Component({
  selector: 'page-client-edit',
  templateUrl: 'client-edit.html',
})
export class ClientEditPage extends BasePage{

  states:any;
  loader:Loading;
  loaded:boolean = false;
  @Input() client:ClientInteface={
    name:'',
    phone:'',
    inscription_number:'',
    cpf_cnpj:''
  }

  @Input() address:AddressInterface={
    CEP:'',
    street_name:'',
    street_number:'',
    city:'',
    state:'',
    country:''
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private stateProvider:StateProvider,
    private cityProvider:CityProvider,
    private addressProvider:AddressProvider,
    public loadingCtrl: LoadingController,
    private clientProvider:ClientProvider,
    private alertCtrl:AlertController,
    private message:MessagesProvider
  ) {
    super(navCtrl);
  }


  Update(){
    this.message.Wait();
    this.clientProvider.update(this.client).subscribe((data)=>{
      console.log(data);
      this.addressProvider.update(this.address).subscribe((data)=>{
        this.message.SuccessAlert('Client editado com sucesso!')
      },(err)=>{
        this.message.ErrorAlert();
      })
    },(err)=>{
      this.message.ErrorAlert();
    })
  }

  getClient(){
    this.client = this.navParams.get('client');
    if(!this.client){
      this.client = {
        name:'',
        phone:'',
        inscription_number:'',
        cpf_cnpj:''
      }
      console.log('geting client data')
      this.clientProvider.get(this.navParams.get('client_id')).subscribe((data:ClientModel)=>{
        this.client = data;
        this.address = data.address;
        this.loaded=true;
        console.log(this.address);
      },(err:any)=>{
        if(err instanceof Error){

        }else{

        }
      })
    }
    else{
      this.address = (<ClientModel>this.client).address;
      this.loaded=true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientEditPage');
    this.getClient();
  }

}
