import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CropProvider } from '../crop/crop';
import { endPoint } from "../../Env";

/*
  Generated class for the IndicatorsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export class IndicatorsData{

  grossIncome:number;
  coe:number;
  cot:number;
  ct:number;
  production:number;
  plantedArea:number;
  productionPerArea:number;
  grossMargin:number;
  grossMarginPerSack:number;
  grossMarginPerArea:number;
  liquidMargin:number;
  liquidMarginPerSack:number;
  liquidMarginPerArea:number;
  profit:number;
  profitPerSack:number;
  profitPerArea:number;
  coePerSack:number;
  coePerArea:number;
  cotPerSack:number;
  cotPerArea:number;
  ctPerSack:number;
  ctPerArea:number;
  trcWithoutField:number;
  trcWithField:number;
  lucrativity:number;
  rentability:number;
  pn:number;
  pcot:number;
  pct:number;

  constructor(area,production,grossIncome,activitiesTotal,depreciation,inventoryTotal,capital_tied,capital_tied_remunaration,sack_value){
    this.grossIncome = grossIncome;
    this.plantedArea = area;
    this.production = production;
    this.coe = activitiesTotal;
    this.cot = this.coe+depreciation;
    this.ct = this.cot + capital_tied_remunaration;
    this.productionPerArea = this.production / this.plantedArea;
    this.grossMargin = this.grossIncome - this.coe;
    this.grossMarginPerSack = this.grossMargin / this.production;
    this.grossMarginPerArea = this.grossMargin / this.plantedArea;
    this.liquidMargin = this.grossIncome - this.cot;
    this.liquidMarginPerSack = this.liquidMargin / this.production;
    this.liquidMarginPerArea = this.liquidMargin / this.plantedArea;
    this.profit = this.grossIncome - this.ct;
    this.profitPerSack = this.profit / this.production;
    this.profitPerArea = this.profit / this.plantedArea;
    this.coePerSack = this.coe / this.production;
    this.coePerArea = this.coe / this.plantedArea;
    this.cotPerSack = this.cot / this.production;
    this.cotPerArea = this.cot / this.plantedArea;
    this.ctPerSack = this.ct / this.production;
    this.ctPerArea = this.ct / this.plantedArea;
    this.trcWithoutField = (this.liquidMargin/inventoryTotal)*100;
    this.trcWithField = (this.liquidMargin/(inventoryTotal+capital_tied))*100;
    this.lucrativity = this.liquidMargin / this.grossIncome;
    this.rentability = (this.liquidMargin /(inventoryTotal+capital_tied))*100;
    this.pn = (this.ct-this.coe)/this.grossMarginPerSack;
    this.pcot = this.cot/sack_value;
    this.pct = this.ct/sack_value;
  }

}

@Injectable()
export class IndicatorsProvider {

  constructor(public http: HttpClient,public cropProvider:CropProvider) {
    console.log('Hello IndicatorsProvider Provider');

  }

  public getIdicators(cropsIds,interest_rate):Promise<IndicatorsData>{
    return new Promise((resolve,reject)=>{
      this.http.post(endPoint+'api/sum_crops',{cropsIds:cropsIds,interest_rate:interest_rate}).subscribe(
        (response:any)=>{
          console.log(response)
          resolve(new IndicatorsData(response.area,response.production,response.grossIncome,response.activitiesTotal,response.depreciation,response.inventoryTotal,response.capital_tied,response.capital_tied_remunaration,30));
        },(err)=>{
          reject();
        }
      );
    });
  }

}
