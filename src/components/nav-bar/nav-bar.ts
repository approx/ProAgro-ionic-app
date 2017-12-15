import { Component,Input} from '@angular/core';
import { DashBoardPage } from "../../pages/dash-board/dash-board";
import { NavController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';

/**
 * Generated class for the NavBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

 export interface NavBarPageInterface{
   name:string;
   icon?:string;
   component: any;
   itensToogle:boolean;
   itens?: NavBarPageInterface[];
 }

@Component({
  selector: 'nav-bar',
  templateUrl: 'nav-bar.html'
})
export class NavBarComponent {

  text: string;
  @Input() page:NavBarPageInterface;


  constructor() {
    console.log('Hello NavBarComponent Component');
    this.text = 'Hello World';
  }

  tooglePageMenu(page){
    page.itensToogle=!page.itensToogle;
  }

  openPage(page:NavBarPageInterface,event:MouseEvent){
    event.stopPropagation();
    event.preventDefault();
    if(MyApp.instance){
      MyApp.instance.nav.push(page.component);
    }
  }

  openPageMenu(page){
    page.itensToogle=true;
  }

  cloasePageMenu(page){
    page.itensToogle=false;
  }

}
