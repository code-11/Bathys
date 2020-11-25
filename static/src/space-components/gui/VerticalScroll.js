import * as PIXI from 'pixi.js';

import EXObj from "../core/EXObj";

import Slider from "./Slider";

export default class VerticalSlider extends EXObj{
  constructor(){
    super();
    this.innerSlider= new Slider(0,1,false,false);
    this.innerSlider.slideMarginX=5;
    this.innerSlider.slideMarginY=2;
    this.innerSlider.trackMouse=this.trackMouse;
    //this.sliderWidth;
  }

  init(){
    this.innerSlider._renderer=this._renderer
    this.innerSlider.init();
    this.innerSlider.angle=90;
    this._width=this.innerSlider._height;
    this._height=this.innerSlider._width;
    this.innerSlider._normVal=(this.innerSlider.slideMarginX/this._height);
    this.addChild(this.innerSlider);
  }

  drawFunc(){
    this.innerSlider.drawFunc();
  }

  trackMouse(shouldTrack){
    if(shouldTrack){
      const mouse_pos=this._renderer.plugins.interaction.mouse.global;
      const offset=this.toLocal(mouse_pos).x;
      let normedVal=offset/this._width;
      const normMin=this.slideMarginX/this._width;
      const normMax=(this._width-this.slideMarginX)/this._width;
      normedVal=Math.max(normedVal, normMin);
      normedVal=Math.min(normedVal, normMax);
      this._normVal=normedVal;
      const actualNormVal= (this._normVal-normMin)/(normMax-normMin);
      this.onSlide(this._normVal, actualNormVal);
      this.refreshSlide(this._slideBox);
    }
  }
}
