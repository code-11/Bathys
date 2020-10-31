import EXObj from "./ExObj";
import * as PIXI from 'pixi.js'

export default class EXCircleObj extends EXObj{
  constructor(){
    super();
    this._polygon=null;
    this._origin=null;
    this._radius=0;
  }

  init(){
    super.init();
    this._polygon=new PIXI.Circle (this._origin.x,this._origin.y,this._radius);
  }

  drawFunc(){
    //Although we've defined the circle above, its not defined when this is called.
    this.drawCircle(this._origin.x,this._origin.y,this._radius);
  }

  setHitArea(){
    this.hitArea=this._polygon;
  }

  containsFunc(x,y){
    return this._polygon.contains(x,y);
  }
}
