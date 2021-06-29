import {dictGet} from "./util/util";

export default class AmountResourceManager {
  constructor(){
    this.resources={};
  }

  static FromObj(obj){
    this.resources={...obj};
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
    const toReturn = new AmountResourceManager(this.resources);
    for(const resName in Object.keys(other.resources)){
      toReturn.incrResourceAmount(other.getResourceAmount(resName));
    }
    return toReturn;
  }

  minus(other, rail=undefined){
    const toReturn = new AmountResourceManager(this.resources);
    for(const resName in Object.keys(other.resources)){
      toReturn.decrResourceAmount(other.getResourceAmount(resName));
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
