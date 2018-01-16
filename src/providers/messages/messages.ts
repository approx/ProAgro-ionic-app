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

  Wait() {
    this.loader = this.loadingCtrl.create({
      content: "Registrando..."
    });
    this.loader.present();
  }

  Done() {
    this.loader.dismiss();
  }

  SuccessAlert(text) {
    this.Done();
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      subTitle: text,
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
}
