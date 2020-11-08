import EXObj from "./EXObj";
import * as PIXI from 'pixi.js'

export default class EXCircleObj extends EXObj{
  constructor(){
    super();
    this._radius=0;
  }

  init(){
    super.init();
  }

  drawFunc(){
    //Although we've defined the circle above, its not defined when this is called.
    this.drawCircle(this.position.x,this.position.y,this._radius);

  }
  setHitArea(){
    const circle=new PIXI.Circle (this.position.x,this.position.y,this._radius);
    this.hitArea=circle;
  }

  containsFunc(x,y){
    const globalPos=this.toGlobal(new PIXI.Point(0,0));
    const circle=new PIXI.Circle (globalPos.x,globalPos.y,this._radius);
    return circle.contains(x,y);
  }
}
