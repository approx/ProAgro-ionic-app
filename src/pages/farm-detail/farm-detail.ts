import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FarmModel } from '../../model/farm.model';
import { MyApp } from '../../app/app.component';
import { FarmProvider } from '../../providers/farm/farm';
import { FieldRegisterPage } from '../../pages/field-register/field-register';
import { FieldDetailPage } from '../../pages/field-detail/field-detail';
import { CropRegisterPage } from '../../pages/crop-register/crop-register';

/**
 * Generated class for the FarmDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment:'farm/:farm_id'
})
@Component({
  selector: 'page-farm-detail',
  templateUrl: 'farm-detail.html',
})
export class FarmDetailPage {
  farm_id:number;
  farm:FarmModel;
  actions=[
  {
    label:'Adicionar Talhão',
    down:()=>{
      console.log('open');
      this.navCtrl.push(FieldRegisterPage.name,{farm:this.farm});
    }
  },{
    label:'Adicionar Nova Safra',
    down:()=>{
      this.navCtrl.push(CropRegisterPage.name,{farm:this.farm});
    }
  }]

  constructor(public navCtrl: NavController, public navParams: NavParams,private farmProvider:FarmProvider) {
    this.farm_id = navParams.get('farm_id');
    this.farm = navParams.get('farm');
  }

  openFieldPage(field){
    this.navCtrl.push(FieldDetailPage.name,{field_id:field.id});
  }

  openFieldRegister(event:MouseEvent){
    event.preventDefault();
    event.stopPropagation();
    this.navCtrl.push(FieldRegisterPage.name,{farm:this.farm});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmDetailPage');
    if(!this.farm&&this.farm_id){
      this.farmProvider.get(this.farm_id).subscribe((data:FarmModel)=>{
        this.farm=data;
        console.log(this.farm);
      });
    }
  }

  ionViewCanEnter(): boolean{
    return MyApp.instance.loged;
  }

}
