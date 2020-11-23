import * as PIXI from 'pixi.js';
import EXPolygonObj from "../core/EXPolygonObj";
import VerticalScroll from "./VerticalScroll";
import GuiUtil from "./GuiUtil"

export default class VerticalScrollWindow extends EXPolygonObj{
  constructor(widget,renderer){
    super();
    this.widget=widget;
    this.scroll=new VerticalScroll();
    this.scroll._renderer=renderer;
  }

  drawFunc(){
    this.lineStyle(this._thickness, this._border_color);
    this.beginFill(this._border_color);
    this.drawPolygon(this._polygon);
    this.scroll.drawFunc();
    this.widget.drawFunc();
  }

  init(){
    this.widget.init();
    this.scroll.innerSlider._width=this._height;
    this.scroll.init();

    this.scroll.x=this.widget._width+this.scroll._width;

    this.innerWidth=this.widget._width;
    this.innerHeight=this.widget._height;

    this._width=this.innerWidth+this.scroll._width;
    this._height=this.innerHeight;

    this._polygon=new PIXI.Polygon([
      new PIXI.Point(0,0),
      new PIXI.Point(0,this._height),
      new PIXI.Point(this._width,this._height),
      new PIXI.Point(this._width,0),
    ]);

    this.addChild(this.widget);
    this.addChild(this.scroll)

  }

}
