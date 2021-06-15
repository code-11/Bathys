import AmountResourceManager from "./AmountResourceManager";

export default class PlayerResourceManager extends AmountResourceManager{
  constructor(){
    super();
  }

  moneyName(){
    return this.globalResourceManager.moneyRes.name;
  }

  getResourceAmount(name){
    return super.getResourceAmount(name);
  }

  incrResourceAmount(name,n=1){
    return super.incrResourceAmount(name,n);
  }

  decrResourceAmount(name,n=1){
    return super.decrResourceAmount(name,n);
  }

  assignResourceAmount(name, val){
    return super.assignResourceAmount(name,val);
  }
}
