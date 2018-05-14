import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FieldModel } from '../../model/field.model';
import { FieldProvider } from '../../providers/field/field';
import { DomSanitizer} from '@angular/platform-browser';
import { CropDetailPage } from '../../pages/crop-detail/crop-detail';
import { CropRegisterPage } from '../../pages/crop-register/crop-register';
import { ActivityRegisterPage } from '../../pages/activity-register/activity-register';
import { FieldEditPage } from "../field-edit/field-edit";
import { BasePage } from "../base/base";
import { FieldListPage } from '../field-list/field-list';
import { MyApp } from '../../app/app.component';
import { MessagesProvider } from '../../providers/messages/messages';

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
export class FieldDetailPage extends BasePage{
  field:FieldModel;
  field_id:number;
  userClient:boolean;
  mapUrl;
  actions=[{
    label:'Registrar Nova Safra',
    down:()=>{
      console.log('open crop register page');
      this.navCtrl.push(CropRegisterPage.name,{field:this.field});
    }
  },{
    label:'Registrar Atividade',
    down:()=>{
      console.log('open activity register page');
      this.navCtrl.push(ActivityRegisterPage.name,{field:this.field});
    }
  }]

  constructor(public navCtrl: NavController, public navParams: NavParams,private fieldProvider:FieldProvider,private sanitizer:DomSanitizer,private message:MessagesProvider) {
    super(navCtrl);
    MyApp.instance.user;
    this.userClient = MyApp.instance.user.role.id == 3;
  }

  openCropPage(crop){
    this.navCtrl.push(CropDetailPage.name,{crop_id:crop.id});
  }

  delete(){
    this.message.ShowConfirmMessage('Deletar talhão',"tem certeza que deseja deletar este talhão? todas as atividades e safras relacionadas a ele também serão deletados",()=>{
      this.message.Wait();
      this.fieldProvider.delete(this.field.id).subscribe((response)=>{
        this.message.SuccessAlert('Safra deletada com sucesso!');
        this.navCtrl.push(FieldListPage.name);
      },(err)=>{
        this.message.ErrorAlert();
      })
    });
  }

  openEditPage(event:MouseEvent){
    event.stopPropagation();
    event.preventDefault();
    this.navCtrl.push(FieldEditPage.name,{field:this.field,field_id:this.field.id});
  }

  openCropRegister(event:MouseEvent){
    event.stopPropagation();
    event.preventDefault();
    this.navCtrl.push(CropRegisterPage.name,{field:this.field});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FieldDetailPage');
    this.field_id = this.navParams.get('field_id');
    this.field = this.navParams.get('field');
    if(this.field){
      this.setMapUrl();
    }
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
