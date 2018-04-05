import { Directive,Input,Output,OnChanges,SimpleChanges,ViewContainerRef,AfterViewInit,HostListener,EventEmitter } from '@angular/core';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the ModelMaskDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[modelMask]' // Attribute selector
})
export class ModelMaskDirective implements AfterViewInit {
  @Input() test:string;
  value:string='';
  pageComponenet:any;

  modelValue=undefined;

  component:any;

  target:any;

  timeToAdd=100;
  ablleToAdd=true;

  @Input() mask:string;
  @Input() maskPlaceHolder:string;

  @Input()
  get modelMask(){
    return this.modelValue;
  }

  @Output() modelMaskChange = new EventEmitter();
  set modelMask(val){
    this.modelValue = val;
    this.modelMaskChange.emit(this.modelValue);
  }

  constructor(private viewContainerRef: ViewContainerRef) {
    console.log('Hello ModelMaskDirective Directive');
  }

  ngAfterViewInit(){
    this.component = this.viewContainerRef[ '_data' ].componentView.component;
  }

  // @HostListener('keydown',['$event'])
  // keyboardChange(keyEvent:KeyboardEvent){
  //   if(keyEvent.keyCode>=48&&keyEvent.keyCode<=57||keyEvent.keyCode >= 65 && keyEvent.keyCode <= 90){
  //     this.value+=keyEvent.key;
  //   }else if(keyEvent.keyCode==8){
  //     this.value = this.value.substring(0, this.value.length - 1);
  //   }
  //   this.modelMask =  this.value;
  //   console.log();
  //   (<any>keyEvent.target).value = 10;
  //   // this.setValueOnMOdel();
  // }

  canPutNumber():boolean{
    let position = this.target.value.search(this.maskPlaceHolder);
    return this.mask[position]=="9"||this.mask[position]==this.maskPlaceHolder;
  }

  canPutLeter():boolean{
    let position = this.target.value.search(this.maskPlaceHolder);
    return this.mask[position]=="A"||this.mask[position]==this.maskPlaceHolder;
  }

  @HostListener('keydown',['$event'])
  getValue(keyEvent){
    keyEvent.preventDefault();
    if(this.modelMask==undefined) this.modelMask='';

    if (((keyEvent.keyCode >= 48 && keyEvent.keyCode <= 57) || (keyEvent.keyCode >= 96 && keyEvent.keyCode <= 105))&&this.canPutNumber()){
      this.modelMask+=keyEvent.key;
    }
    else if (keyEvent.keyCode >= 65 && keyEvent.keyCode <= 90&&this.canPutLeter()){
      this.modelMask+=keyEvent.key;
    }
    else if(keyEvent.keyCode == 8){
      this.modelMask = this.modelMask.substring(0,this.modelMask.length-1);
      // console.log(this.modelMask);
    }
    this.component.value = this.modelMask;
    this.target.value = this.maskedValue(this.modelMask);
    this.setCursor();
    this.ablleToAdd=false;
    console.log(keyEvent);
  }

  @HostListener('keyup',['$event'])
  keyup(){
    console.log('test');
    this.target.value = this.maskedValue(this.modelMask);
    this.setCursor();
  }

  @HostListener('blur',['$event'])
  blur(event){
    if(this.modelMask==undefined||this.modelMask==''){
      this.target.value = '';
    }else{
      this.target.value = this.maskedValue(this.modelMask);
      this.setCursor();
    }
  }

  getMask():string{
    let mask = this.mask.replace(/9|A/g,this.maskPlaceHolder);
    return mask;
  }

  maskedValue(value):string{
    let masked = this.getMask();
    for (let i = 0; i < value.length; i++) {
        masked = masked.replace(this.maskPlaceHolder,value[i]);
    }
    return masked;
  }

  setCursor(){
    let maskedValueWithoutPlaceHolder = this.target.value.replace(new RegExp(this.maskPlaceHolder,'g'),'');
    let position = this.target.value.search(this.maskPlaceHolder);
    if(this.modelMask){
      this.target.selectionStart= position!=-1 ? position : this.target.value.length
      this.target.selectionEnd= position!=-1 ? position : this.target.value.length
    }else{
      this.target.selectionStart=  0;
      this.target.selectionEnd=  0;
    }
  }

  unMask(value):string{
    let mask = this.getMask();
    let positionsToRemove = [];
    for (let i = 0; i < value.length; i++) {
      if(value[i]==this.maskPlaceHolder){
        positionsToRemove.push(i);
      }
      else if(value[i]==mask[i]){
        positionsToRemove.push(i);
      }
    }
    let unmasked = value;
    for (let i = 0; i < positionsToRemove.length; i++) {
        unmasked = unmasked.substring(0,positionsToRemove[i]);
    }
    return unmasked;
  }

  @HostListener('focus',['$event'])
  @HostListener('click',['$event'])
  focus(event){
    this.target = event.target;
    if(this.modelMask==undefined){
      this.target.value = this.getMask();
    }
    else{
      this.target.value = this.maskedValue(this.modelMask);
      this.setCursor();
    }
    this.setCursor();
    console.log(this.modelMask);
    this.setPlaceHolder();
  }

  setValue(val){
  }

  setPlaceHolder(){
  }

  ngOnChanges(changes:SimpleChanges){
    // console.log(changes);
  }

}
