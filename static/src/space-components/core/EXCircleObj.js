import EXObj from "./EXObj";
import * as PIXI from 'pixi.js'

export default class EXCircleObj extends EXObj{
  constructor(){
    super();
    // this._radius=0;
    this.viewport=null;
    this.name="unnamed";
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
    const origin=this.toGlobal(new PIXI.Point(0,0));
    const view_correction= this.viewport.toWorld(0,0);
    const globalPoint=new PIXI.Point(origin.x+view_correction.x,origin.y+view_correction.y);
    const circle = new PIXI.Circle(globalPoint.x,globalPoint.y,this._radius);
    return circle.contains(x,y);
  }
}
