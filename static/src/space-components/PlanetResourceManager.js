import AmountResourceManager from "./AmountResourceManager";
import TimeHook from "./TimeHook";

export default class PlanetResourceManager extends AmountResourceManager {
  constructor(){
    super();
    this.production=null;
    this.consumption=null;
    this.secondaryConsumption=[];
    this.globalResourceManager=null;
    this.amountsWanted={};
  }

  price(res, planetAmntDelta=0){
    const trueAmountHave=this.getResourceAmount(res.name);
    const amountHave=Math.max(.00001,trueAmountHave+planetAmntDelta);
    const amountWanted=this.amountsWanted[res.name];
    const trueMultiplier=amountWanted/amountHave
    const multiplier = Math.min(5,trueMultiplier);
    return res.intrinsicVal * multiplier;
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
