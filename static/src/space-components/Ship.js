import EXPolygonObj from "./core/EXPolygonObj";
import AmountResourceManager from "./AmountResourceManager";

export default class Ship extends EXPolygonObj {
  constructor(shipId){
    super();
    this.resourceManager = new AmountResourceManager();
    this.shipId=shipId;
  }

  getShipId(){
    return this.shipId;
  }

  makeMinimapIcon(){
    const icon = new EXPolygonObj();
    icon.setPoints(this.getPoints().map((pair)=>[pair[0]*10,pair[1]*10]));
    icon.setColor(this._color);
    icon.x=this.x;
    icon.y=this.y;
    return icon;
  }
}
