import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FarmProvider } from '../../providers/farm/farm';
import { BasePage } from '../base/base';
import { UnityProvider } from '../../providers/unity/unity';
import { ActivityTypeProvider } from '../../providers/activity-type/activity-type';
import { ActivityProvider } from '../../providers/activity/activity';
import { CropModel } from '../../model/crop.model';
import { MessagesProvider } from '../../providers/messages/messages'

/**
 * Generated class for the PropagateActivityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({segment:'farm/:farm_id/propagate-activity'})
@Component({
  selector: 'page-propagate-activity',
  templateUrl: 'propagate-activity.html',
})
export class PropagateActivityPage extends BasePage{

  farm;
  crops:any[];
  activity:any={};
  filteredCrops;
  cropSearch='';
  showFinalCrops=false;
  selectedAll=false;
  activityTypes;
  unities;
  perPercentage=true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private farmProvider:FarmProvider,
    private unityProvider:UnityProvider,
    private activityProvider:ActivityProvider,
    private activityTypeProvider:ActivityTypeProvider,
    private message:MessagesProvider

  ) {
    super(navCtrl);
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad PropagateActivityPage');
    this.getFarm();
    this.getCrops();
    this.getActivitiesType();
    this.getUnities();
  }

  getFarm(){
    this.farm=this.navParams.get('farm');
    if(!this.farm){
      this.farmProvider.get(this.navParams.get('farm_id')).subscribe(
        (response)=>{
          this.farm = response;
          console.log(this.farm);
        },(err)=>{
          this.navCtrl.setRoot('LoginPage');
        }
      )
    }
  }

  getCrops(){
    this.farmProvider.crops(this.navParams.get('farm_id')).subscribe(
      (response:CropModel[])=>{
        this.crops = response.map((crop)=>{
          return {...crop,selected:false};
        });
        this.filteredCrops = this.crops;
        this.filter();
      },(err)=>{
        // this.navCtrl.setRoot('LoginPage');
      }
    )
  }

  getActivitiesType(){
    this.activityTypeProvider.getAll().subscribe(
      (response)=>{
        this.activityTypes = response;
      },(err)=>{

      }
    );
  }

  getUnities(){
    this.unityProvider.getAll().subscribe(
      (response)=>{
        this.unities = response;
      },(err)=>{

      }
    );
  }

  selectedActivityType(activity){
    if(activity.value){
      this.activity.activity_type_id = activity.value.id;
    }else this.activity.activity_type_id = null;
  }

  filterCropByFinalized(crops){
    if(!this.showFinalCrops){
      let today = new Date();
      return this.crops.filter((crop)=>{
        let cropFinalDate = new Date(crop.final_date);
        return cropFinalDate.getTime()>today.getTime();
      });
    }else return this.crops;
  }

  filter(){
    let cropsByFinalized = this.filterCropByFinalized(this.crops);
    this.filteredCrops = this.filterCropsByName(cropsByFinalized);
    if(this.selectedAll){
      this.selectedAll = false;
      this.selectAll();
    }
  }

  selectAll(){
    if(this.selectedAll){
      this.filteredCrops.forEach((element,index)=>{
        element.selected = true;
      });
    }else{
      this.crops.forEach((element,index)=>{
        element.selected = false;
      });
    }
  }

  logCrops(){
    console.log(this.crops);
  }

  filterCropsByName(crops){
    return crops.filter((crops)=>{
      return crops.name.toLowerCase().indexOf(this.cropSearch.toLowerCase())!=-1||crops.field.name.toLowerCase().indexOf(this.cropSearch.toLowerCase())!=-1||this.cropSearch=='';
    });
  }

  Register(){
    let onlySelcted = this.crops.filter((crop)=>{
      return crop.selected;
    });
    let maped = '';
    onlySelcted.forEach((element,index)=>{
      if(index>0)maped+=';';
      maped+=element.id;
    });
    let activityToSend = {...this.activity,crops:maped};
    this.message.Wait();
    if(this.perPercentage){
      this.activityProvider.savePercentageSizeMultiple(activityToSend).subscribe(
        (response)=>{
          this.message.SuccessAlert('Atividades salvas com sucesso!');
        },(err)=>{
          this.message.ErrorAlert();
        }
      );
    }else{
      this.activityProvider.saveMultiple(activityToSend).subscribe(
        (response)=>{
          this.message.SuccessAlert('Atividades salvas com sucesso!');
        },(err)=>{
          this.message.ErrorAlert();
        }
      );
    }
  }

  onSearch(){
    this.filter();
  }

  onSearchCancel(search){
    console.log(search);
  }

  getActivities(){

  }

}
