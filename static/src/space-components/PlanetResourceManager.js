import AmountResourceManager from "./AmountResourceManager";
import TimeHook from "./TimeHook";
import {dictGet} from "./util/util";

export default class PlanetResourceManager extends AmountResourceManager {
  constructor(){
    super();
    this.production=null; //[resource]
    this.consumption=null; //[resource]
    this.secondaryConsumption=[]; //[resource]
    this.globalResourceManager=null;
  }

  doesProduce(res){
    for (const prodRes of this.production) {
      if (prodRes.name==res.name){
        return true;
      }
    }
    return false;
  }

  price(amntsWanted, res, planetAmntDelta=0){
    const trueAmountHave=this.getResourceAmount(res.name);
    const amountHave=Math.max(.00001,trueAmountHave+planetAmntDelta);
    const amountWanted=dictGet(amntsWanted.resources,res.name,0);
    let trueMultiplier=1;
    if (!this.doesProduce(res)){
      trueMultiplier=amountWanted/amountHave
    }
    const multiplier = Math.min(5,trueMultiplier);
    return res.intrinsicVal * multiplier;
  }

  avgPrice(amntsWanted,res,n){
    const absNum=Math.abs(n);
    let cumulativeValue=0;
    for(let i=0;i<absNum;i+=1){
      const curPrice = this.price(amntsWanted,res,i*Math.sign(n));
      cumulativeValue+=curPrice;
    }
    return cumulativeValue/n;
  }

}
