import EXObj from "./ExObj";
import * as PIXI from 'pixi.js'

export default class EXCircleObj extends EXObj{
  constructor(){
    super();
    this._polygon=null;
    this._origin=null;
    this._radius=0;
  }

  drawFunc(){
    this.drawCircle(this._origin.x,this._origin.y,this._radius);
  }
}
