import { Directive,Input,Output,OnChanges,SimpleChanges,ViewContainerRef,AfterViewInit,HostListener,EventEmitter } from '@angular/core';
import { NgForm,Validators,AbstractControl,FormControl,NgControl } from '@angular/forms';
import { ViewController,TextInput } from 'ionic-angular';

function hasExclamationMark(input: FormControl) {
  const hasExclamation = input.value.indexOf('!') >= 0;
  return hasExclamation ? null : { needsExclamation: true };
}

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
  @Input() clean=true;
  @Input() form:NgForm;
  _formControl:FormControl;

  @Input()
  get modelMask(){
    return this.modelValue;
  }

  @Output() modelMaskChange = new EventEmitter();
  set modelMask(val){
    this.modelValue = val;
    if(!this._formControl){
      this._formControl = new FormControl(this.modelMask,[Validators.required,(input: FormControl)=>{
        if(!this.currency){
          if(this.modelMask){
            let value = input.value;
            for (let i = 0; i < this.modelMask.length; i++) {
              if(value[i]==this.maskPlaceHolder){
                console.log('not complete');
                return {maskComplete:false}
              }
            }
            return null;
          }
          else if(!this.modelMask){
            return {emptyValue:false}
          }
        }else{
          if(this.modelMask){
            return null;
          }
          else if(!this.modelMask){
            return {emptyValue:false}
          }
        }
      }]);
    }
    this._formControl.setValue(val);
    this.modelMaskChange.emit(this.modelValue);
  }

  constructor(private viewContainerRef: ViewContainerRef) {
    console.log('Hello ModelMaskDirective Directive');
  }

  ngAfterViewInit(){
    this.component = this.viewContainerRef[ '_data' ].componentView.component;
    this.form.form.addControl(this.component._elementRef.nativeElement.getAttribute('name'),this._formControl);
    console.log(this.component._elementRef.nativeElement.getAttribute('name'));
  }

  checkValid(){
    console.log(this.modelMask);
    if(!this.currency){
      if(this.modelMask){
        this.component._item._elementRef.nativeElement.classList.add('input-has-value');
        this.component._item._elementRef.nativeElement.classList.add('item-input-has-value');
        this.component._item._elementRef.nativeElement.classList.remove('ng-invalid');
        this.component._item._elementRef.nativeElement.classList.add('ng-valid');
        let value = this.clean ? this.maskedValue(this.modelMask) : this.modelMask ;
        for (let i = 0; i < this.modelMask.length; i++) {
          if(value[i]==this.maskPlaceHolder){
            console.log('breaked');
            this.component._item._elementRef.nativeElement.classList.remove('ng-valid');
            this.component._item._elementRef.nativeElement.classList.add('ng-invalid');
            break;
          }
        }
      }
      else if(!this.modelMask){
        this.component._item._elementRef.nativeElement.classList.add('ng-invalid');
      }
    }else{
      if(this.modelMask){
        this.component._item._elementRef.nativeElement.classList.add('input-has-value');
        this.component._item._elementRef.nativeElement.classList.add('item-input-has-value');
        this.component._item._elementRef.nativeElement.classList.remove('ng-invalid');
        this.component._item._elementRef.nativeElement.classList.add('ng-valid');
      }
      else if(!this.modelMask){
        this.component._item._elementRef.nativeElement.classList.add('ng-invalid');
      }
    }
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
    this.target.value = this.clean ? this.maskedValue(this.modelMask) : this.modelMask ;
    this.setCursor();
    this.ablleToAdd=false;

  }

  addKeyToMask(keyEvent){
    if (((keyEvent.keyCode >= 48 && keyEvent.keyCode <= 57) || (keyEvent.keyCode >= 96 && keyEvent.keyCode <= 105))&&this.canPutNumber()){
      if(this.clean){
        this.modelMask+=keyEvent.key;
      }else{
        this.modelMask=this.unMask(this.modelMask);
        this.modelMask+=keyEvent.key;
        this.modelMask=this.maskedValue(this.modelMask);
      }
    }
    else if (keyEvent.keyCode >= 65 && keyEvent.keyCode <= 90&&this.canPutLeter()){
      this.modelMask+=keyEvent.key;
    }else if(keyEvent.keyCode == 8){
      if(this.clean){
        this.modelMask = this.modelMask.substring(0,this.modelMask.length-1);
      }else{
        // keyEvent.preventDefault();
        // keyEvent.stopPropagation();
        this.modelMask=this.unMask(this.modelMask);
        this.modelMask = this.modelMask.substring(0,this.modelMask.length-1);
        this.modelMask=this.maskedValue(this.modelMask);
      }

      // console.log(this.modelMask);
    }
  }

  addKeyToCurrency(keyEvent){
    if((keyEvent.keyCode >= 48 && keyEvent.keyCode <= 57) || (keyEvent.keyCode >= 96 && keyEvent.keyCode <= 105&&this.canPutNumber())){
      // console.log(this.modelMask);
      this.modelMask=Math.round(this.modelMask*100);
        // console.log(this.modelMask);
        this.modelMask = this.modelMask.toString();
        // console.log(this.modelMask);
        this.modelMask+=keyEvent.key;
        // console.log(this.modelMask);
        this.modelMask = parseInt(this.modelMask)/100;
        // console.log(this.modelMask);
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
    this.target.value = this.clean ? this.maskedValue(this.modelMask) : this.modelMask ;
    this.setCursor();
  }

  @HostListener('blur',['$event'])
  blur(event){
    if(this.modelMask==undefined||this.modelMask==''){
      this.target.value = '';
    }else{
      this.target.value = this.clean ? this.maskedValue(this.modelMask) : this.modelMask ;
      this.setCursor();
    }
    this.checkValid();
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
    if(value==undefined) value='';
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
    let unmasked='';
    for (let i = 0; i < value.length; i++) {
        if(value[i]!=mask[i]){
          unmasked+=value[i];
        }
    }
    return unmasked;
  }

  @HostListener('focus',['$event'])
  @HostListener('click',['$event'])
  focus(event){
    console.log(this.form.form);
    this.component._item._elementRef.nativeElement.classList.add('ng-touched');
    this.target = event.target;
    if(this.modelMask==undefined){
      this.target.value = this.getMask();
    }
    else{
      this.target.value = this.clean ? this.maskedValue(this.modelMask) : this.modelMask ;
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
