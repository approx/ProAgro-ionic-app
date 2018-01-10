import { Component,Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CultureProvider } from '../../providers/culture/culture';
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
export class CulturePage {
  cultures;
  @Input() name;

  constructor(public navCtrl: NavController, public navParams: NavParams,private cultureProvider:CultureProvider) {
    this.getCultures();
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

  delete(id){
    console.log('deleting')
    this.cultureProvider.delete(id).subscribe(()=>{
      this.getCultures();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CulturePage');
  }

}
