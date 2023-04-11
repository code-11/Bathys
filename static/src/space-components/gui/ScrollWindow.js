import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport'
import EXPolygonObj from "../core/EXPolygonObj";
import VerticalScroll from "./VerticalScroll";
import GuiUtil from "./GuiUtil"

import {HARD_BORDER_COLOR} from "../util/Config";


export default class VerticalScrollWindow extends EXPolygonObj{
  constructor(widget,renderer){
    super();
    this.widget=widget;
    this.scroll=new VerticalScroll();
    this.scroll._renderer=renderer;
    this._thickness=0;
    this.offset=0;
  }

  drawFunc(){
    this.lineStyle(this._thickness, this._border_color);
    // this.beginFill(this._border_color);
    this.drawPolygon(this._polygon);
    if (this.shouldScrollbar()){
      this.scroll.drawFunc();
    }
    this.widget.drawFunc();
  }

  shouldScrollbar(){
    return this.innerHeight > this._height;
  }

  init(){
    this.widget.init();

    this.innerWidth=this.widget._width;
    this.innerHeight=this.widget._height;

    if (this.innerHeight<this._height){
      this._height=this.innerHeight;
    }

    // this._height=this.innerHeight;
    this.scroll.innerSlider._width=this._height;

    const gripRatio = this._height / this.innerHeight;
    const gripSize = this._height * gripRatio;
    let gripSizeToUse = gripSize < 4 ? 4 : gripSize;
    gripSizeToUse = gripSizeToUse > this._height ? this._height : gripSizeToUse;
    this.scroll.innerSlider.slideMarginX= gripSizeToUse/2;
    // this.scroll.sliderWidth=gripSizeToUse;

    this.scroll.init();
    this.scroll.x=this.widget._width+this.scroll._width;
    this._width=this.innerWidth+(this.shouldScrollbar() ? this.scroll._width : 0);

    this.scroll.innerSlider.onSlide=(normVal,val)=>{
      this.widget.y=val*(this._height-this.innerHeight);
    }

    this._polygon=new PIXI.Polygon([
      new PIXI.Point(0,0),
      new PIXI.Point(0,this._height),
      new PIXI.Point(this._width,this._height),
      new PIXI.Point(this._width,0),
    ]);

    const viewport= new PIXI.Polygon([
      new PIXI.Point(0,0),
      new PIXI.Point(0,this._height),
      new PIXI.Point(this.innerWidth,this._height),
      new PIXI.Point(this.innerWidth,0),
    ])

    const elMask= new PIXI.Graphics();
    elMask.beginFill(HARD_BORDER_COLOR);
    elMask.drawPolygon(viewport);
    elMask.endFill();
    elMask.x=this.widget.x;
    elMask.y=this.widget.y;
    this.widget.mask=elMask;
    // viewport.mask=this._polygon;
    // viewport.addChild(this.widget);

    // this.addChild(viewport);
    this.addChild(elMask);
    this.addChild(this.widget);
    if (this.shouldScrollbar()){
      this.addChild(this.scroll);
    }


  }

}
