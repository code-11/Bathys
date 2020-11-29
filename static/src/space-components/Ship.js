import EXPolygonObj from "./core/EXPolygonObj";
import AmountResourceManager from "./AmountResourceManager";


export default class Ship extends EXPolygonObj {
  constructor(){
    super();
    this.resourceManager = new AmountResourceManager();
  }
}
