import {dictGet} from "./util/util";

export default class AmountResourceManager {
  constructor(){
    this.resources={};
  }

  static FromObj(obj){
    const toReturn = new AmountResourceManager();
    toReturn.resources={...obj};
    return toReturn;
  }

  getResourceAmount(name){
    return dictGet(this.resources, name, 0);
  }

  incrResourceAmount(name,n=1){
    this.resources[name]=this.getResourceAmount(name)+n;
  }

  decrResourceAmount(name,n=1){
    this.resources[name]=this.getResourceAmount(name)-n;
  }

  assignResourceAmount(name, val){
    this.resources[name]=val;
  }

  plus(other){
    const toReturn = AmountResourceManager.FromObj(this.resources);
    for(const resName of Object.keys(other.resources)){
      toReturn.incrResourceAmount(resName,other.getResourceAmount(resName));
    }
    return toReturn;
  }

  minus(other, rail=undefined){
    const toReturn =AmountResourceManager.FromObj(this.resources);
    for(const resName of Object.keys(other.resources)){
      toReturn.decrResourceAmount(resName,other.getResourceAmount(resName));
      if (rail!=undefined && toReturn.getResourceAmount(resName)<rail){
        toReturn.assignResourceAmount(resName,rail);
      }
    }
    return toReturn;
  }

  allPositive(){
    return !(Object.values(this.resources).some((num)=>num < 0));
  }

}
