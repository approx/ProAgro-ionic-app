import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ClientProvider } from '../../providers/client/client';
import { ClientModel } from '../../model/client.model';
import { FarmDetailPage } from '../../pages/farm-detail/farm-detail';
import { FarmRegisterPage } from '../../pages/farm-register/farm-register';
import { FieldRegisterPage } from '../../pages/field-register/field-register';
import { CropRegisterPage } from '../../pages/crop-register/crop-register';
import { ClientEditPage } from "../client-edit/client-edit";
import { BasePage } from "../base/base";
import { UserRegisterProvider } from "../../providers/user-register/user-register";
import { MessagesProvider } from '../../providers/messages/messages';

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


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private clientProvider:ClientProvider,
    public alertCtrl: AlertController,
    public userRegisterProvider:UserRegisterProvider,
    public toastCtrl: ToastController,
    private message:MessagesProvider)
  {
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

  openUserRegister(event:MouseEvent){

    let alert = this.alertCtrl.create({
      title: 'Conceder Acesso ao Cliente',
      inputs: [{
        type: 'text',
        name: 'name',
        placeholder: 'Nome do Usuário'
      },{
        type: 'email',
        name: 'email',
        placeholder: 'E-mail'
      }],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
            if (this.emailValidator(data.email)) {
              if (data.name != '') {
                this.grantAccessClient(data);
                return true;
              } else {
                this.showErrorToast('Informe o Nome do Usuário!');
                return false;
              }
            } else {
              this.showErrorToast('E-mail Inválido');
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }

  grantAccessClient (data) {
    console.log(data);
    this.message.Wait();
    var role_id = 3;
    this.userRegisterProvider.acess(data.name,data.email,role_id).subscribe((data)=>{
      this.message.SuccessAlert('Acesso concedido com sucesso, foi enviado um e-mail para o usuario terminar o cadastro!');
    },(err)=>{
      this.message.ErrorAlert();
    });
  }

  showErrorToast(data: any) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  emailValidator(email) {
    if( /(.+)@(.+){2,}\.(.+){2,}/.test(email) ){
      return true;
    } else {
       return false;
    }
  }
}
