import * as PIXI from 'pixi.js';

import EXPolygonObj from "../core/EXPolygonObj";

export default class PopupWindow extends EXPolygonObj{
  constructor(widget){
    super();
    this.widget=widget;
    this._thickness=1;
    this._border_color=0xAAAAAA;
    this._color=0xAAAAAA;
    this.barHeight=10;
    this.topBar=null;
    this.interactive=true;
  }

  init(){
    this.widget.init();

    this.innerWidth=this.widget._width;
    this.innerHeight=this.widget._height;

    this._height=this.innerHeight+this.barHeight;
    this._width=this.innerWidth;

    this.topBar=new PIXI.Polygon([
      new PIXI.Point(0,0),
      new PIXI.Point(0,this.barHeight),
      new PIXI.Point(this.innerWidth,this.barHeight),
      new PIXI.Point(this.innerWidth,0),
    ]);

    this._polygon= new PIXI.Polygon([
      new PIXI.Point(0,0),
      new PIXI.Point(0,this._height),
      new PIXI.Point(this._width,this._height),
      new PIXI.Point(this._width,0),
    ])

    this.widget.y=this.barHeight;

    this.addChild(this.widget);

    this.setHitArea();
    this.on("click",(e1)=>{
      e1.stopPropagation();
    });
  }

  drawFunc(){
    this.lineStyle(this._thickness, this._border_color);
    this.drawPolygon(this._polygon);
    this.beginFill(this._color);
    this.drawPolygon(this.topBar);
    this.endFill();
    this.widget.drawFunc();
  }

  onClose(){}

  onOpen(){}
}
