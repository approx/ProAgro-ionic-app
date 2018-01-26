import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FieldModel } from '../../model/field.model';
import { FieldProvider } from '../../providers/field/field';
import { DomSanitizer} from '@angular/platform-browser';
import { CropDetailPage } from '../../pages/crop-detail/crop-detail';
import { CropRegisterPage } from '../../pages/crop-register/crop-register';

/**
 * Generated class for the FieldDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({segment:'field/:field_id'})
@Component({
  selector: 'page-field-detail',
  templateUrl: 'field-detail.html',
})
export class FieldDetailPage {
  field:FieldModel;
  field_id:number;
  mapUrl;
  actions=[{
    label:'Registrar Nova Safra',
    down:()=>{
      console.log('open crop register page');
    }
  },{
    label:'Registrar Atividade',
    down:()=>{
      console.log('open activity register page');
    }
  }]

  constructor(public navCtrl: NavController, public navParams: NavParams,private fieldProvider:FieldProvider,private sanitizer:DomSanitizer) {
    this.field_id = navParams.get('field_id');
    this.field = navParams.get('field');
    if(this.field){
      this.setMapUrl();
    }
  }

  openCropPage(crop){
    this.navCtrl.push(CropDetailPage.name,{crop_id:crop.id});
  }

  openCropRegister(event:MouseEvent){
    event.stopPropagation();
    event.preventDefault();
    this.navCtrl.push(CropRegisterPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FieldDetailPage');
    if(!this.field&&this.field_id){
      this.fieldProvider.get(this.field_id).subscribe((data:FieldModel)=>{
        this.field=data;
        console.log(this.field);
        this.setMapUrl();
      });
    }
  }

  setMapUrl(){
    if(this.field.lat&&this.field.lng){
      this.mapUrl="https://www.google.com/maps/embed/v1/place?key=AIzaSyBocEdaAefVaBdvmzmN7yUudqb0l9yyQ-U&q="+this.field.lat+","+this.field.lng;
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.mapUrl);
    }
  }

}
