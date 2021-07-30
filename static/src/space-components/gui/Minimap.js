import * as PIXI from 'pixi.js';
import EXPolygonObj from "../core/EXPolygonObj";

export default class Minimap extends EXPolygonObj{
  constructor(width, height,levelWidth, levelHeight){
    super();
    this.scale.x=width / levelWidth;
    this.scale.y=height / levelHeight;
    //TODO: Why is there this arbitrary *2 scaling needed????!!
    this._polygon=new PIXI.Polygon([
      new PIXI.Point(0,0),
      new PIXI.Point(0,levelHeight*2),
      new PIXI.Point(levelWidth*2,levelHeight*2),
      new PIXI.Point(levelWidth*2,0),
    ]);
    this._height=height;
    this._width = width;
    this._thickness = 1/this.scale.x;
    this._border_color=0xff1010;
  }

  drawFunc(){
    this.lineStyle(this._thickness, this._border_color);
    this.setColor(0x0099ff);
    this.drawPolygon(this._polygon);
  }
}
