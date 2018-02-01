import { Component,Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FieldModel } from '../../model/field.model';
import { FarmModel } from '../../model/farm.model';
import { FieldProvider } from '../../providers/field/field';
import { FarmProvider } from '../../providers/farm/farm';
import { FieldDetailPage } from '../../pages/field-detail/field-detail';

/**
 * Generated class for the FieldListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 enum Operator{
   MAIOR="Maior",
   MENOR="Menor",
   IGUAL="Igual"
 }

@IonicPage({
  segment:'field/list'
})
@Component({
  selector: 'page-field-list',
  templateUrl: 'field-list.html',
})
export class FieldListPage {

  @Input() fields:FieldModel[];
  filteredFields:FieldModel[];
  filterText:string='';
  areaFilter:number;
  farms:FarmModel[];
  farmFilter:number;
  operator:Operator;
  loaded:boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private farmProvider:FarmProvider,
    private fieldProvider:FieldProvider
  ) {
    this.getFarms();
    this.getFields();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FieldListPage');
  }

  getFarms(){
    this.farmProvider.getAll().subscribe((data:FarmModel[])=>{
      this.farms=data;
    });
  }

  getFields(){
    this.fieldProvider.getAll().subscribe((data:FieldModel[])=>{
      this.fields=data;
      this.filteredFields=this.fields;
      this.loaded= true;
    })
  }

  Filter(){
    this.filteredFields = this.fields.filter((field:FieldModel)=>{
      if(field.name.toLowerCase().indexOf(this.filterText)!=-1||this.filterText==''){
        if(field.farm.id==this.farmFilter||!this.farmFilter){
          if(this.operator==Operator.MAIOR&&this.areaFilter){
            if(field.area>this.areaFilter) return true;
          }
          else if(this.operator==Operator.MENOR&&this.areaFilter){
            if(field.area<this.areaFilter) return true;
          }
          else if(this.operator==Operator.IGUAL&&this.areaFilter){
            if(field.area==this.areaFilter) return true;
          }
          else return true;
        }
        return false;
      }
    });
  }

  openField(field:FieldModel){
    this.navCtrl.push(FieldDetailPage.name,{field:field,field_id:field.id});
  }

}
