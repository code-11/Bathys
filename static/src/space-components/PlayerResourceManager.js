import AmountResourceManager from "./AmountResourceManager";

export default class PlayerResourceManager extends AmountResourceManager{
  constructor(){
    super();
    this.amountMoney=100;
  }

  moneyName(){
    return this.globalResourceManager.moneyRes.name;
  }

  getResourceAmount(name){
    if(name==this.moneyName()){
      return this.amountMoney;
    }
    return super.getResourceAmount(name);
  }

  incrResourceAmount(name,n=1){
    if(name==this.moneyName()){
      this.amountMoney+=n;
    }
    return super.incrResourceAmount(name,n);
  }

  decrResourceAmount(name,n=1){
    if(name==this.moneyName()){
      this.amountMoney-=n;
    }
    return super.decrResourceAmount(name,n);
  }

  assignResourceAmount(name, val){
    if(name==this.moneyName()){
      this.amountMoney=val;
    }
    return super.assignResourceAmount(name,val);
  }
}
