import EXPolygonObj from "./core/EXPolygonObj";
import PlayerResourceManager from "./PlayerResourceManager";


export default class Ship extends EXPolygonObj {
  constructor(){
    super();
    this.resourceManager = new PlayerResourceManager();
  }
}
