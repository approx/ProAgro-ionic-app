import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClientProvider } from '../../providers/client/client';
import { ClientInteface } from '../../model/client.model';
import { ClientRegisterPage } from '../client-register/client-register';

/**
 * Generated class for the ClientListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-client-list',
  templateUrl: 'client-list.html',
})
export class ClientListPage {
  clients:ClientInteface[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private clientsProvider:ClientProvider) {
    this.clientsProvider.getAll().subscribe((data:any)=>{
        this.clients = data;
    },(err:any) => {
      if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        console.log('An error occurred:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientListPage');
  }

  openRegisterPage(event:MouseEvent){
    event.preventDefault();
    event.stopPropagation();
    this.navCtrl.push(ClientRegisterPage);
  }

}
