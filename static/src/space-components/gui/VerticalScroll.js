import EXObj from "../core/EXObj";

import Slider from "./Slider";

export default class VerticalSlider extends EXObj{
  constructor(){
    super();
    this.innerSlider= new Slider(0,1,false,false);
    this.innerSlider.slideMarginX=5;
    this.innerSlider.slideMarginY=2;
  }

  init(){
    this.innerSlider._renderer=this._renderer
    this.innerSlider.init();
    this.innerSlider.angle=90;
    this._width=this.innerSlider._height;
    this._height=this.innerSlider._width;
    this.addChild(this.innerSlider);
  }

  drawFunc(){
    this.innerSlider.drawFunc();
  }
  // trackMouse(shouldTrack){
  //   if(shouldTrack){
  //     const mouse_pos=this._renderer.plugins.interaction.mouse.global;
  //     const mouse_rel_y=this.toLocal(mouse_pos).y;
  //     let almostNormVal=mouse_rel_y/this._width;
  //     almostNormVal=Math.max(almostNormVal,0);
  //     almostNormVal=Math.min(almostNormVal,1);
  //     this._normVal=almostNormVal;
  //     this.onSlide(this._normVal, this.getVal());
  //     // console.log(almostNormVal);
  //     this.refreshSlide(this._slideBox);
  //     this.refreshInner();
  //   }
  // }
}
