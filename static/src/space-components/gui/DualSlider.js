import * as PIXI from 'pixi.js';
import Slider from "./Slider";
export default class DualSlider extends Slider{

  reset(){
    this._normVal=.5;
  }

  refreshInner(){
      this._innerBox.clear();
      const innerWidth=this._width*this._normVal;

      const inner = new PIXI.Polygon([
            new PIXI.Point(this._width*.5,0),
            new PIXI.Point(this._width*.5,this._heightWithoutValLbl),
            new PIXI.Point(innerWidth,this._heightWithoutValLbl),
            new PIXI.Point(innerWidth,0),
      ]);

      this._innerBox.lineStyle(0, this._outerColor);
      this._innerBox.beginFill(this._innerColor);
      this._innerBox.drawPolygon(inner);
      this._innerBox.endFill();
  }

  getVal(){
    const normValFromCenter=(this._normVal-.5)*2;
    if(normValFromCenter>0){
      return normValFromCenter * this._maxVal;
    }else{
      return normValFromCenter * this._minVal;
    }
  }
}
