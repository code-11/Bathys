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
    this.amountsWanted={}; //resn:num
  }

  doesProduce(res){
    for (const prodRes of this.production) {
      if (prodRes.name==res.name){
        return true;
      }
    }
    return false;
  }

  price(res, planetAmntDelta=0){
    const trueAmountHave=this.getResourceAmount(res.name);
    const amountHave=Math.max(.00001,trueAmountHave+planetAmntDelta);
    const amountWanted=dictGet(this.amountsWanted,res.name,0);
    let trueMultiplier=1;
    if (!this.doesProduce(res)){
      trueMultiplier=amountWanted/amountHave
    }
    const multiplier = Math.min(5,trueMultiplier);
    return res.intrinsicVal * multiplier;
  }

  calcAmountsWanted(development,highCost){
    const neededDevMult= (development+2) * 2;
    const unneededDevMult = (development);
    this.globalResourceManager.resources.forEach((res)=>{
      const numNeeded= Math.floor((highCost * unneededDevMult) / res.intrinsicVal);
      this.amountsWanted[res.name]=unneededDevMult;
    })
    this.consumption.forEach((res)=>{
      const numNeeded= Math.floor((highCost*neededDevMult) / res.intrinsicVal);
      this.amountsWanted[res.name]=numNeeded;
    });
  }

  avgPrice(res,n){
    const absNum=Math.abs(n);
    let cumulativeValue=0;
    for(let i=0;i<absNum;i+=1){
      const curPrice = this.price(res,i*Math.sign(n));
      cumulativeValue+=curPrice;
    }
    return cumulativeValue/n;
  }

}
