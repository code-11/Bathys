import {dictGet, dictFilter} from "./util/util";

export default class AmountResourceManager {
  constructor(){
    this.resources={}; //{name:amnt}
  }

  static FromObj(obj){
    const toReturn = new AmountResourceManager();
    toReturn.resources={...obj};
    return toReturn;
  }

  static FromOther(amntResManager){
    return AmountResourceManager.FromObj(amntResManager.resources);
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

  fill(val){
    for(const resName of Object.keys(this.resources)){
        this.assignResources(resName,val);
    }
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

  top(n=5){
    const topEntries= Object.entries(this.resources).sort((a,b) => {
      const [keyA, valA]=a;
      const [keyB, valB]=b;
      return valA-valB;
    }).slice(0,n);
    return AmountResourceManager.FromObj(Object.fromEntries(topEntries));
  }

  nonZeroRes(){
    return AmountResourceManager.FromObj(dictFilter(this.resources, (amnt)=> amnt>0));
  }

  allPositive(){
    return !(Object.values(this.resources).some((num)=>num < 0));
  }

  //------EMPOWERED BY GLOBAL KNOWLEDGE----------

  //If you were to sell all the resources in this manager at intrinsic price,
  // what would the total be?
  totalValue(globalResourceManager){
    let sum=0;
    for(const resName of Object.keys(this.resources)){
      sum+=globalResourceManager.resources_by_name[resName].intrinsicVal * this.getResourceAmount(resName);
    }
    return sum;
  }

}
