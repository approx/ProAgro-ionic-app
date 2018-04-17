import { Component,Input,ViewChild,AfterViewInit } from '@angular/core';
import { NgModel,NgForm } from '@angular/forms';
import { TextInput } from  'ionic-angular';

/**
 * Generated class for the FilterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'filter',
  templateUrl: 'filter.html'
})
export class FilterComponent implements AfterViewInit {

  @ViewChild('input') input: TextInput;

  @Input() model;
  @Input() objs:Array<any>;
  searchedObjs:Array<any>;
  @Input() label;
  @Input() form:NgForm;

  searching:boolean = false;
  searchText:string;
  selected;

  constructor() {
    console.log('Hello FilterComponent Component');
  }

  ngAfterViewInit(){
    console.log(this.input);
    this.form.addControl(<NgModel>this.input.ngControl);
  }

  Search(){
    this.searchedObjs = this.objs.filter((obj)=>{
      return obj.name.toLowerCase().indexOf(this.searchText.toLowerCase())!=-1 || obj.id.toLowerCase().indexOf(this.searchText.toLowerCase())!=-1
    });
    if(this.searchText!=""){
      this.searching=true;
    }else{
      this.searching=false;
    }
  }

  Exit(){
    // this.searching=false;
    if(!this.selected){
      //this.searchText='';
    }
  }

  Select(iten){
    this.selected = iten;
    this.searchText=iten.id + iten.name;
    this.input.value = this.searchText;
    this.input.setValue(this.searchText);
    this.searching=false;
  }

}
