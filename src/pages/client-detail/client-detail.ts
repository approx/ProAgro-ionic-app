import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClientProvider } from '../../providers/client/client';
import { ClientModel } from '../../model/client.model';
import { MyApp } from '../../app/app.component';
import { FarmDetailPage } from '../../pages/farm-detail/farm-detail';
import { FarmRegisterPage } from '../../pages/farm-register/farm-register';

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
  farmSize=300;


  constructor(public navCtrl: NavController, public navParams: NavParams,private clientProvider:ClientProvider) {
    this.client = navParams.get('client');
    this.client_id = navParams.get('client_id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientDetailPage');
    console.log();

    if(!this.client&&this.client_id){
      console.log('geting client data')
      this.clientProvider.get(this.client_id).subscribe((data:ClientModel)=>{
        this.client = data;
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

  openFarmPage(farm){
    this.navCtrl.push(FarmDetailPage.name,{farm_id:farm.id});
  }

  openFarmRegister(event:MouseEvent){
    event.preventDefault();
    event.stopPropagation();
    this.navCtrl.push(FarmRegisterPage.name);
  }

}
