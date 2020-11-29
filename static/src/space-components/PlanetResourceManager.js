import {dictGet} from "./util/util";

export default class PlanetResourceManager {
  constructor(){
    this.resources={};
    this.production=null;

    this.globalResourceManager=null;
  }

  getResourceAmount(name){
    return dictGet(this.resources, name, 0);
  }
}
