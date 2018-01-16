import { Component,Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FieldInterface } from '../../model/field.model';
import { FieldProvider } from '../../providers/field/field';
import { MessagesProvider } from '../../providers/messages/messages';
import { DomSanitizer} from '@angular/platform-browser';
import { FarmModel } from '../../model/farm.model';
import { FarmProvider } from '../../providers/farm/farm';

/**
 * Generated class for the FieldRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-field-register',
  templateUrl: 'field-register.html',
})
export class FieldRegisterPage{

  @Input() field:FieldInterface={};
  farms:FarmModel[];
  mapUrl;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fieldProvider:FieldProvider,
    private message:MessagesProvider,
    private sanitizer:DomSanitizer,
    private farmProvider:FarmProvider
  ) {
    this.farmProvider.getAll().subscribe((data:FarmModel[])=>{
      this.farms = data;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FieldRegisterPage');
  }

  setMapUrl(){
    if(this.field.lat&&this.field.lng){
      this.mapUrl="https://www.google.com/maps/embed/v1/place?key=AIzaSyBocEdaAefVaBdvmzmN7yUudqb0l9yyQ-U&q="+this.field.lat+","+this.field.lng;
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.mapUrl);
    }
    console.log('changed')
  }

  Register(){
    this.message.Wait();
    this.fieldProvider.save(this.field).subscribe((data)=>{
      this.message.SuccessAlert('Talhão registrado com sucesso!');
    },(err)=>{
      this.message.ErrorAlert();
    });
  }

}
