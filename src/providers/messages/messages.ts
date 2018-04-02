import { Injectable } from '@angular/core';
import { AlertController,LoadingController,Loading} from 'ionic-angular';

/*
  Generated class for the MessagesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessagesProvider {
  loader: Loading;

  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
  ) {}

  Wait(message?:string) {
    let msg = message ? message : "Registrando...";
    this.loader = this.loadingCtrl.create({
      content: msg
    });
    this.loader.present();
  }

  Done() {
    this.loader.dismiss();
  }

  SuccessAlert(text,handler?) {
    this.Done();
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      subTitle: text,
      buttons: handler ? [{text:'OK',handler:handler}]:['OK']
    });
    alert.present();
  }

  ErrorAlert(message?:string) {
    this.Done();
    if(!message){
      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: 'Algum erro inesperdado ocorreu, tente novamente!',
        buttons: ['OK']
      });
      alert.present();
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: message,
        buttons: ['OK']
      });
      alert.present();
    }
  }
}
