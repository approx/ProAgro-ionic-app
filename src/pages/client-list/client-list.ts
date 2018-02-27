import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClientProvider } from '../../providers/client/client';
import { ClientInteface,ClientModel } from '../../model/client.model';
import { ClientRegisterPage } from '../client-register/client-register';
import { ClientDetailPage } from '../client-detail/client-detail';
import { MyApp } from '../../app/app.component';

/**
 * Generated class for the ClientListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment:'client/list'
})
@Component({
  selector: 'page-client-list',
  templateUrl: 'client-list.html',
})
export class ClientListPage {
  clients:ClientModel[];
  filteredClients:ClientModel[];
  loaded:boolean=false;
  user;
  searchTxt:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private clientsProvider:ClientProvider
  ) {
    this.user = MyApp.instance.user;
    this.clientsProvider.getAll().subscribe((data:ClientModel[])=>{
        this.clients = data;
        this.filteredClients = data;
        this.loaded = true;
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

  ionViewCanEnter(): boolean{
    return MyApp.instance.loged;
  }

  getItems($event){
    this.filteredClients = this.clients.filter((client)=>{
      return client.name.indexOf(this.searchTxt)!=-1||this.searchTxt=='';
    });
    console.log();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientListPage');
  }

  openRegisterPage(event:MouseEvent){
    event.preventDefault();
    event.stopPropagation();
    this.navCtrl.push(ClientRegisterPage.name);
  }

  openClientPage(client:ClientInteface){
    this.navCtrl.push(ClientDetailPage.name,{client:client,client_id:client.id});
  }

}
