import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClientProvider } from '../../providers/client/client';
import { ClientModel } from '../../model/client.model';
import { MyApp } from '../../app/app.component';
import { FarmDetailPage } from '../../pages/farm-detail/farm-detail';
import { FarmRegisterPage } from '../../pages/farm-register/farm-register';
import { FieldRegisterPage } from '../../pages/field-register/field-register';
import { CropRegisterPage } from '../../pages/crop-register/crop-register';
import { ClientEditPage } from "../client-edit/client-edit";
import { BasePage } from "../base/base";

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
export class ClientDetailPage extends BasePage{
  client_id:number;
  client:ClientModel;
  farmSize=300;


  constructor(public navCtrl: NavController, public navParams: NavParams,private clientProvider:ClientProvider) {
    super(navCtrl);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientDetailPage');
    console.log();
    this.client = this.navParams.get('client');
    this.client_id = this.navParams.get('client_id');

    if(!this.client&&this.client_id){
      console.log('geting client data')
      this.clientProvider.get(this.client_id).subscribe((data:ClientModel)=>{
        this.client = data;
        if (this.client.inscription_number == null) {
            this.client.inscription_number = '';
        }
        if (this.client.inscription_number != '') {
            this.client.inscription_number = ' - ' + this.client.inscription_number;
        }
      },(err:any)=>{
        if(err instanceof Error){

        }else{

        }
      })
    }
  }

  openFarmPage(farm){
    this.navCtrl.push(FarmDetailPage.name,{farm_id:farm.id});
  }

  openFarmRegister(event:MouseEvent){
    event.preventDefault();
    event.stopPropagation();
    this.navCtrl.push(FarmRegisterPage.name,{client:this.client});
  }

  openFieldRegister(event:MouseEvent){
    event.preventDefault();
    event.stopPropagation();
    this.navCtrl.push(FieldRegisterPage.name,{client:this.client});
  }

  openEditPage(event:MouseEvent){
    event.preventDefault();
    event.stopPropagation();
    this.navCtrl.push(ClientEditPage.name,{client:this.client,client_id:this.client.id});
  }


  openCropRegister(event:MouseEvent){
    event.preventDefault();
    event.stopPropagation();
    this.navCtrl.push(CropRegisterPage.name,{client:this.client});
  }
}
