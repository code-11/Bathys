import EXPolygonObj from "../core/EXPolygonObj";
import * as PIXI from 'pixi.js';

export default class Container extends EXPolygonObj{
  constructor(width, height){
    super();
    this._polygon =new PIXI.Polygon([
      new PIXI.Point(0,0),
      new PIXI.Point(0,height),
      new PIXI.Point(width,height),
      new PIXI.Point(width,0),
    ]);
  }

  init(){
    // this.beginFill(this._color);
    this.lineStyle(this._thickness, this._border_color);
    this.drawFunc();
    // this.endFill();
    this.setHitArea();
  }
}
