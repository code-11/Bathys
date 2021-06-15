import {dictGet} from "./util/util";

export default class AmountResourceManager {
  constructor(){
    this.resources={};
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

}
