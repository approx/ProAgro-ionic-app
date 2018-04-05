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
  @Input() currency:boolean = false;

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

  countLengthToDigit():number{
    let mask = this.getMask();
    let count = 0;
    for (let i = 0; i < mask.length; i++) {
        if(mask[i]==this.maskPlaceHolder) count++;
    }
    return count;
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
    if(this.currency){
      console.log(this.target.value.length<=21)
      return this.target.value.length<=20;
    }else{
      let position = this.target.value.search(this.maskPlaceHolder);
      return this.mask[position]=="9"||this.mask[position]==this.maskPlaceHolder;
    }
  }

  canPutLeter():boolean{
    let position = this.target.value.search(this.maskPlaceHolder);
    return this.mask[position]=="A"||this.mask[position]==this.maskPlaceHolder;
  }

  @HostListener('keydown',['$event'])
  getValue(keyEvent){
    keyEvent.preventDefault();
    if(this.modelMask==undefined) this.modelMask='';

    if(!this.currency){
      this.addKeyToMask(keyEvent);
    }else{
      this.addKeyToCurrency(keyEvent);
    }
    this.component.value = this.modelMask;
    this.target.value = this.maskedValue(this.modelMask);
    this.setCursor();
    this.ablleToAdd=false;

  }

  addKeyToMask(keyEvent){
    if (((keyEvent.keyCode >= 48 && keyEvent.keyCode <= 57) || (keyEvent.keyCode >= 96 && keyEvent.keyCode <= 105))&&this.canPutNumber()){
      this.modelMask+=keyEvent.key;
    }
    else if (keyEvent.keyCode >= 65 && keyEvent.keyCode <= 90&&this.canPutLeter()){
      this.modelMask+=keyEvent.key;
    }else if(keyEvent.keyCode == 8){
      this.modelMask = this.modelMask.substring(0,this.modelMask.length-1);
      // console.log(this.modelMask);
    }
  }

  addKeyToCurrency(keyEvent){
    if((keyEvent.keyCode >= 48 && keyEvent.keyCode <= 57) || (keyEvent.keyCode >= 96 && keyEvent.keyCode <= 105&&this.canPutNumber())){
      console.log(this.modelMask);
      this.modelMask=Math.round(this.modelMask*100);
        console.log(this.modelMask);
        this.modelMask = this.modelMask.toString();
        console.log(this.modelMask);
        this.modelMask+=keyEvent.key;
        console.log(this.modelMask);
        this.modelMask = parseInt(this.modelMask)/100;
        console.log(this.modelMask);
    }else if(keyEvent.keyCode == 8){
      this.modelMask=Math.round(this.modelMask*100);
      this.modelMask = this.modelMask.toString();
      this.modelMask = this.modelMask.substring(0,this.modelMask.length-1);
      this.modelMask = parseFloat(this.modelMask!='' ? this.modelMask: 0)/100;

      // console.log(this.modelMask);
    }
  }

  @HostListener('keyup',['$event'])
  keyup(){
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
    let mask
    if(!this.currency){
      mask = this.mask.replace(/9|A/g,this.maskPlaceHolder);
    }else{
      mask = this.mask.replace(/9|A/g,'');
      if(this.modelMask==undefined){
        mask+='0,00';
      }
    }
    return mask;
  }

  stringPutInPosition(s:string,position:number,value:string){
    let splitedString = [s.substring(0,position),s.substring(position)];
    return splitedString[0]+value+splitedString[1];
  }

  maskedValue(value):string{
    let masked = this.getMask();
    if(!this.currency){
      for (let i = 0; i < value.length; i++) {
        masked = masked.replace(this.maskPlaceHolder,value[i]);
      }
    }else{
      // console.log(value)
      if(value==''){
        masked+='0,00';
      }else{
        let string = value.toFixed(2).toString();
        string =  string.replace('.',',');
        let splited = string.split(',');
        splited[0] = this.stringPutDotsInNumbersToBig(splited[0]);
        masked+= splited[0]+','+splited[1];
      }
    }
    return masked;
  }

  stringPutDotsInNumbersToBig(s:string):string{
    let positionsToAddDot=[];
    let index=0;
    for (let i = s.length-1; i >=0 ; i--) {
        index++;
        if(index>=4){
          s = this.stringPutInPosition(s,i+1,'.');
          index=0;
          i++;
        }
    }
    return s;
  }

  setCursor(){
    if(!this.currency){
      let maskedValueWithoutPlaceHolder = this.target.value.replace(new RegExp(this.maskPlaceHolder,'g'),'');
      let position = this.target.value.search(this.maskPlaceHolder);
      if(this.modelMask){
        this.target.selectionStart= position!=-1 ? position : this.target.value.length
        this.target.selectionEnd= position!=-1 ? position : this.target.value.length
      }else{
        this.target.selectionStart=  0;
        this.target.selectionEnd=  0;
      }
    }else{
      this.target.selectionStart= this.target.value.length;
      this.target.selectionEnd= this.target.value.length;
    }
  }

  unMask(value):string{
    let mask = this.getMask();
    let positionsToRemove = [];
    let ignoreNext=false;
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
    // console.log(this.modelMask);
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
