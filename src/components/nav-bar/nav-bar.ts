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
   render:boolean;
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
  renderMenu=true;
  renderSubmenu=true;


  constructor() {
    console.log('Hello NavBarComponent Component');

  }

  ngOnInit() {
    console.log(this.page);
    this.page.render = false;
    let roles = this.page.role.split("|");
    if(roles.indexOf(this.user.role.name)==-1){
      this.page.render=false;
    } else {
      this.page.render=true;
    }

    for (var i = 0; i < this.page.itens.length; i++) {
      let rolesSubMenu = this.page.itens[i].role.split("|");
      if (rolesSubMenu.indexOf(this.user.role.name)==-1){
        this.page.itens[i].render=false;
      } else {
        this.page.itens[i].render=true;
        this.page.render=true;
      }
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
