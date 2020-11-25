import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport'
import EXPolygonObj from "../core/EXPolygonObj";
import VerticalScroll from "./VerticalScroll";
import GuiUtil from "./GuiUtil"

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
    this.scroll.drawFunc();
    this.widget.drawFunc();
  }

  init(){
    this.widget.init();
    this.scroll.innerSlider._width=this._height;

    this.innerWidth=this.widget._width;
    this.innerHeight=this.widget._height;

    // this._height=this.innerHeight;

    const gripRatio = this._height / this.innerHeight;
    const gripSize = this._height * gripRatio;
    let gripSizeToUse = gripSize < 4 ? 4 : gripSize;
    gripSizeToUse = gripSizeToUse > this._height ? this._height : gripSizeToUse;
    this.scroll.innerSlider.slideMarginX= gripSizeToUse/2;
    // this.scroll.sliderWidth=gripSizeToUse;

    this.scroll.init();
    this.scroll.x=this.widget._width+this.scroll._width;
    this._width=this.innerWidth+this.scroll._width;
    // const scrollSize = this.innerHeight - this._height;
    //
    // const windowRatio = this.offset / scrollSize;
    // const gripPosition = scrollSize * windowRatio;

    const viewport = new Viewport({
        screenWidth:   this._width,
        screenHeight: this._height,
        worldWidth: 1000,
        worldHeight: 1000,

        interaction:this.scroll._renderer // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    })

    this.scroll.innerSlider.onSlide=(normVal,val)=>{
      viewport.y=val*this._width;
    }

    this._polygon=new PIXI.Polygon([
      new PIXI.Point(0,0),
      new PIXI.Point(0,this._height),
      new PIXI.Point(this._width,this._height),
      new PIXI.Point(this._width,0),
    ]);

    viewport.addChild(this.widget);

    this.addChild(viewport);
    this.addChild(this.scroll);


  }

}
