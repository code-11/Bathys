import * as PIXI from 'pixi.js'

export default class EXObj extends PIXI.Graphics{
  constructor(){
    super();
    this._color=0x000000;
  }

  containsFunc(x,y){
    console.err("containsFunc not implemented");
  }

  drawFunc(){
    console.err("drawFunc not implemented");
  }

  init(){
    this.beginFill(this._color);
    this.drawFunc();
    this.endFill();
  }

  setColor(color){
    this._color=color;
  }
}
