import {dictGet} from "./util/util";

export default class AmountResourceManager {
  constructor(){
    this.resources={};
  }

  getResourceAmount(name){
    return dictGet(this.resources, name, 0);
  }

  assignResourceAmount(name, val){
    this.resources[name]=val;
  }

}
