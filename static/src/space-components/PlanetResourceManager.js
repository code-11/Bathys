import AmountResourceManager from "./AmountResourceManager";

export default class PlanetResourceManager extends AmountResourceManager {
  constructor(){
    super();
    this.production=null;

    this.globalResourceManager=null;
  }
}
