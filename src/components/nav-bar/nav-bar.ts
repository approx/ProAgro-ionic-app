import { Component,Input} from '@angular/core';
import { MyApp } from '../../app/app.component';
import { UserModel } from "../../model/user.model";

/**
 * Generated class for the NavBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

 export interface NavBarPageInterface{
   name:string;
   role:string;
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
  @Input() user:UserModel;
  render=true;


  constructor() {
    console.log('Hello NavBarComponent Component');

  }

  ngOnInit() {
    console.log(this.page);
    let roles = this.page.role.split("|");
    if(roles.indexOf(this.user.role.name)==-1){
      this.render=false;
    }
  }

  tooglePageMenu(page){
    page.itensToogle=!page.itensToogle;
  }

  openPage(page:NavBarPageInterface,event:MouseEvent){
    event.stopPropagation();
    event.preventDefault();
    if(MyApp.instance){
      MyApp.instance.nav.push(page.component.name);
    }
  }

  openPageMenu(page){
    page.itensToogle=true;
  }

  cloasePageMenu(page){
    page.itensToogle=false;
  }

}
