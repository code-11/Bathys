import * as PIXI from 'pixi.js';
import EXPolygonObj from "../core/EXPolygonObj";
import Button from "./Button";

import {HIGHLIGHT_COLOR, HARD_BORDER_COLOR, SOFT_BORDER_COLOR, TEXT_COLOR} from "../util/Config";


export default class Slider extends EXPolygonObj{
  constructor(minVal=0,maxVal=1, hasInner=true, hasValLbl=true){
    super();
    this._normVal=.5;
    this._minVal=minVal;
    this._maxVal=maxVal;

    this._thickness=1;
    this._outerColor=HARD_BORDER_COLOR;
    this._innerColor=SOFT_BORDER_COLOR;

    this._width=150; //pixels
    this._heightWithoutValLbl=15; //pixels

    this._shouldTrack=false;
    this.hasValLbl=hasValLbl;
    this.hasInner=hasInner;

    this.slideMarginX=3;
    this.slideMarginY=2;
  }

  setMinMax(minVal,maxVal){
    this._slideBox.removeAllListeners();
    this._innerBox.clear();
    this._slideBox.clear();
    this._valLbl.clear();
    this.removeChild(this._innerBox);
    this.removeChild(this._slideBox);
    this.removeChild(this._valLbl);
    this._innerBox.destroy();
    this._slideBox.destroy();
    this._valLbl.destroy();

    this._minVal=minVal;
    this._maxVal=maxVal;
  }

  getMult(){
    return this._maxVal-this._minVal;
  }

  getShift(){
    return this._minVal;
  }

  sliderTextTransform(val){
    return val;
  }

  valTransform(val){
    return val;
  }

  getVal(){
    return this.valTransform((this._normVal * this.getMult()) + this._minVal);
  }

  refreshValLbl(){
    const txt=Number.parseFloat(this.sliderTextTransform(this.getVal())).toFixed(2);
    this._valLbl.rapidTextRefresh1(txt);
    const innerWidth=this._width*this._normVal;
    const half_text_width=this._valLbl._width/2;
    this._valLbl.x = innerWidth- half_text_width;
    this._valLbl.rapidTextRefresh2(txt);
  }

  refreshSlide(slideBox){
    slideBox.clear();

    const innerWidth=this._width*this._normVal;

    const slideMarginX=this.slideMarginX;
    const slideMarginY=this.slideMarginY;
    const slide = new PIXI.Polygon([
      new PIXI.Point(innerWidth-slideMarginX,-slideMarginY),
      new PIXI.Point(innerWidth-slideMarginX, this._heightWithoutValLbl+slideMarginY),
      new PIXI.Point(innerWidth+slideMarginX, this._heightWithoutValLbl+slideMarginY),
      new PIXI.Point(innerWidth+slideMarginX, -slideMarginY),
    ]);

    this._slideBox.lineStyle(0, this._outerColor);
    this._slideBox.beginFill(HIGHLIGHT_COLOR);
    this._slideBox.drawPolygon(slide);
    this._slideBox.endFill();

    this._slideBox.hitArea=slide;
    this._slideBox.interactive=true;
    this._slideBox.buttonMode=true;

    if(this.hasValLbl){
      this.refreshValLbl();
    }
  }

  refreshInner(){
      this._innerBox.clear();
      const innerWidth=this._width*this._normVal;

      const inner = new PIXI.Polygon([
            new PIXI.Point(0,0),
            new PIXI.Point(0,this._heightWithoutValLbl),
            new PIXI.Point(innerWidth,this._heightWithoutValLbl),
            new PIXI.Point(innerWidth,0),
      ]);

      this._innerBox.lineStyle(0, this._outerColor);
      this._innerBox.beginFill(this._innerColor);
      this._innerBox.drawPolygon(inner);
      this._innerBox.endFill();
  }

  onSlide(normVal, val){}

  trackMouse(shouldTrack){
    if(shouldTrack){
      const mouse_pos=this._renderer.plugins.interaction.mouse.global;
      const mouse_rel_x=this.toLocal(mouse_pos).x;
      let almostNormVal=mouse_rel_x/this._width;
      almostNormVal=Math.max(almostNormVal,0);
      almostNormVal=Math.min(almostNormVal,1);
      this._normVal=almostNormVal;
      this.onSlide(this._normVal, this.getVal());
      // console.log(almostNormVal);
      this.refreshSlide(this._slideBox);
      if (this.hasInner){
        this.refreshInner();
      }
    }
  }

  init(){
    this._border =new PIXI.Polygon([
          new PIXI.Point(0,0),
          new PIXI.Point(0,this._heightWithoutValLbl),
          new PIXI.Point(this._width,this._heightWithoutValLbl),
          new PIXI.Point(this._width,0),
    ]);

    this._slideBox= new PIXI.Graphics();
    this._slideBox.interactive=true;
    this._slideBox.buttonMode=true;

    this._innerBox= new PIXI.Graphics();

    this._valLbl = new Button(this.getVal(), {
      fontFamily : 'Arial',
      fontSize: 18,
      fill : TEXT_COLOR,
      align : 'center'
    });
    this._valLbl._thickness=2;
    this._valLbl._border_color=HARD_BORDER_COLOR;
    this._valLbl._padding=5;
    this._valLbl.init();
    this._valLbl.y=this._heightWithoutValLbl+4;
    // this._valLbl.visible=false;

    if(this.hasValLbl){
      this._height =this._valLbl._height + this._heightWithoutValLbl+4;
    }else{
      this._height=this._heightWithoutValLbl;
    }

    const self=this;
    this._slideBox.on("mousedown",(e1)=>{
      self._shouldTrack=true;
      // this._valLbl.visible=true;
      this._slideBox.on("mousemove",(e2)=>{
        this.trackMouse(self._shouldTrack);
      });
      e1.stopPropagation();
    });
    this._slideBox.on("mouseup",(e3)=>{
      this._shouldTrack=false;
      // this._valLbl.visible=false;
      e3.stopPropagation();
    });
    this._slideBox.on("mouseupoutside",(e4)=>{
      this._shouldTrack=false;
      // this._valLbl.visible=false;
      e4.stopPropagation();
    });

    this.addChild(this._innerBox);
    this.addChild(this._slideBox);
    if(this.hasValLbl){
      this.addChild(this._valLbl);
    }
  }

  drawFunc(){
    this.refreshSlide(this._slideBox);
    if(this.hasInner){
      this.refreshInner(this._innerBox);
    }
    this.lineStyle(this._thickness, this._outerColor);
    this.drawPolygon(this._border);
  }
}
