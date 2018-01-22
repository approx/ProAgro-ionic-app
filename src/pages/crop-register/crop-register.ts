import { Component,Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CropInterface } from '../../model/crop.model';
import { CropProvider } from '../../providers/crop/crop';
import { FarmProvider } from '../../providers/farm/farm';
import { FarmModel } from '../../model/farm.model';
import { FieldModel } from '../../model/field.model';
import { FieldProvider } from '../../providers/field/field';
import { CultureModel } from '../../model/culture.model';
import { CultureProvider } from '../../providers/culture/culture';
import { DomSanitizer} from '@angular/platform-browser';
import { MessagesProvider } from '../../providers/messages/messages';

/**
 * Generated class for the CropRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({segment:'crop/register'})
@Component({
  selector: 'page-crop-register',
  templateUrl: 'crop-register.html',
})
export class CropRegisterPage {

  @Input() crop:CropInterface={
    name:''
  };
  farms:FarmModel[];
  fields:FieldModel[];
  filteredFields:FieldModel[];
  cultures:CultureModel[];
  farm:FarmModel;
  mapUrl;

  maxDate:string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private farmProvider:FarmProvider,
    private fieldProvider:FieldProvider,
    private culturesProvider:CultureProvider,
    private sanitizer:DomSanitizer,
    private message:MessagesProvider,
    private cropProvider:CropProvider
  ) {
    let date = new Date();
    date.setFullYear(date.getFullYear()+10);
    this.maxDate = date.getFullYear()+'-12-31';
    this.farmProvider.getAll().subscribe((data:FarmModel[])=>{
      this.farms = data;
      console.log(data)
    });
    this.fieldProvider.getAll().subscribe((data:FieldModel[])=>{
      this.fields = data;
      this.filteredFields = data;
    });
    this.culturesProvider.getAll().subscribe((data:CultureModel[])=>{
      this.cultures = data;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CropRegisterPage');
  }

  filterFarm(event){
    this.filteredFields = this.fields.filter((field)=>{
      if(field.farm.id==event.id){
        this.setMapUrl();
        return true;
      }
      return false;
    });
  }

  Register(){
    this.message.Wait();
    this.cropProvider.save(this.crop).subscribe((data)=>{
      this.message.SuccessAlert('Safra registrada com sucesso!');
    },(err)=>{
      this.message.ErrorAlert();
    });
  }

  setMapUrl(){
    if(this.farm){
      this.mapUrl="https://www.google.com/maps/embed/v1/place?key=AIzaSyBocEdaAefVaBdvmzmN7yUudqb0l9yyQ-U&q="+this.farm.address.street_name+'+'+this.farm.address.street_number+", "+this.farm.address.city.name+"+"+this.farm.address.city.state.name;
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.mapUrl);
    }
  }

}
