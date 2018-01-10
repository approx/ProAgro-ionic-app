import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClientProvider } from '../../providers/client/client';
import { ClientModel,ClientInteface } from '../../model/client.model';
import { MyApp } from '../../app/app.component';
import { ContactComponent } from '../../components/contact/contact';
import { AddressModel,AddressInterface } from '../../model/address.model';

/**
 * Generated class for the ClientDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment:'client/:client_id'
})
@Component({
  selector: 'page-client-detail',
  templateUrl: 'client-detail.html',
})
export class ClientDetailPage {
  client_id:number;
  client:ClientModel;
  address:AddressModel;


  constructor(public navCtrl: NavController,private http:HttpClient, public navParams: NavParams,private clientProvider:ClientProvider) {
    this.client = navParams.get('client');
    this.client_id = this.navParams.get('client_id');
    if(this.client){
      this.getAddressData();
    }
  }

  getAddressData(){
    this.client.getAddress().subscribe((data:AddressInterface)=>{
      this.address=AddressModel.CreateFromInterface(data,this.http);
    },(err:any)=>{
      if(err instanceof Error){

      }else{

      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientDetailPage');
    console.log();
    if(!this.client&&this.client_id){
      console.log('geting client data')
      this.clientProvider.get(this.client_id).subscribe((data:ClientInteface)=>{
        this.client = ClientModel.CreateFromInterface(data,this.http);
        this.getAddressData();
      },(err:any)=>{
        if(err instanceof Error){

        }else{

        }
      })
    }
  }

  ionViewCanEnter(): boolean{
    return MyApp.instance.loged;
  }

}
