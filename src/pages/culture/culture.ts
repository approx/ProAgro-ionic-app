import { Component,Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CultureProvider } from '../../providers/culture/culture';
import { BasePage } from "../base/base";
import { MyApp } from '../../app/app.component';
import { FarmListPage } from '../../pages/farm-list/farm-list';
/**
 * Generated class for the CulturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-culture',
  templateUrl: 'culture.html',
})
export class CulturePage extends BasePage{
  cultures;
  @Input() name;

  constructor(public navCtrl: NavController, public navParams: NavParams,private cultureProvider:CultureProvider) {
    super(navCtrl);
  }

  ionViewWillEnter(){
    if (MyApp.instance.user.role.id == 3) {
      console.log('sem permissão');
      this.navCtrl.push(FarmListPage.name)
      //window.history.back();
    } else {
      console.log('user passou: ' + MyApp.instance.user.role.id);
    }
  }

  getCultures(){
    this.cultureProvider.getAll().subscribe((data:any)=>{
      this.cultures=data;
    },(err:any)=>{
      if(err instanceof Error){

      }else{

      }
    })
  }

  register(){
    this.cultureProvider.post(this.name).subscribe(()=>{
      this.getCultures();
      this.name="";
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CulturePage');
    this.getCultures();
  }

}
