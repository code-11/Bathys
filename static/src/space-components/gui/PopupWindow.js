import * as PIXI from 'pixi.js';

import Button from "./Button";
import EXPolygonObj from "../core/EXPolygonObj";

import {SOFT_TEXT_COLOR, SOFT_BORDER_COLOR, DARK_COLOR} from "../util/Config";

export default class PopupWindow extends EXPolygonObj{
  constructor(widget){
    super();
    this.widget=widget;
    this._thickness=1;
    this._border_color=SOFT_BORDER_COLOR;
    this._color=SOFT_TEXT_COLOR;
    this.barHeight=15;
    this.topBar=null;
    this.closeBtn=null;
    this.interactive=true;
    this.tracking_top_bar=false;
  }

  createCloseBtn(){
    const closeBtn= new Button("X", {
      fontFamily : 'Arial',
      fontSize: 12,
      fill : DARK_COLOR,
      align : 'center'
    });
    closeBtn._thickness=2;
    closeBtn._border_color=DARK_COLOR;
    closeBtn._padding=2;
    closeBtn.interactive=true;
    closeBtn.buttonMode=true;

    closeBtn.on("click",()=>{
      this.onClose()
    });

    return closeBtn;
  }

  init(){
    this.widget.init();

    this.innerWidth=this.widget._width;
    this.innerHeight=this.widget._height;

    this._height=this.innerHeight+this.barHeight;
    this._width=this.innerWidth;

    this.topBar= new EXPolygonObj();
    this.topBar.interactive=true;
    this.topBar.setPoints([
      [0,0],
      [0,this.barHeight],
      [this.innerWidth,this.barHeight],
      [this.innerWidth,0],
    ]);
    this.topBar._color=this._color;
    this.topBar.init();
    this.topBar.setHitArea();

    this.closeBtn=this.createCloseBtn();
    this.closeBtn.init();
    this.closeBtn.x=this.innerWidth-this.closeBtn._width;
    this.topBar.addChild(this.closeBtn);

    //Lets make this bad boy moveable
    const self = this;
    this.topBar.on("mousedown",(e1)=>{
      self.tracking_top_bar=true;
      self.tracking_data = e1.data;
      self.tracking_start=self.tracking_data.getLocalPosition(this.topBar);
    });
    this.top_graphic.on("mousemove",(e2)=>{
      self.trackMouse(self.tracking_top_bar);
    });
    this.topBar.on("mousemove",(e2)=>{
      self.trackMouse(self.tracking_top_bar);
    });
    this.topBar.on("mouseup",(e3)=>{
      self.tracking_top_bar=false;
      self.tracking_data=null;
      self.tracking_start=null;
    });
    this.top_graphic.on("mouseup",(e4)=>{
      self.tracking_top_bar=false;
      self.tracking_data=null;
      self.tracking_start=null;
    });


    this._polygon= new PIXI.Polygon([
      new PIXI.Point(0,0),
      new PIXI.Point(0,this._height),
      new PIXI.Point(this._width,this._height),
      new PIXI.Point(this._width,0),
    ])

    this.widget.y=this.barHeight;

    this.addChild(this.topBar);
    this.addChild(this.widget);

    this.setHitArea();
    this.on("click",(e1)=>{
      e1.stopPropagation();
    });
  }

  trackMouse(shouldTrack){
    if(shouldTrack){
        const newPosition = this.tracking_data.getLocalPosition(this.parent);
        this.x=newPosition.x-this.tracking_start.x;
        this.y=newPosition.y-this.tracking_start.y;
        // const global_mouse_pos=this._renderer.plugins.interaction.mouse.global;
        // const global_diff= this.viewport.toWorld(0,0);
        // const mouse_pos=new PIXI.Point(global_mouse_pos.x+global_diff.x,global_mouse_pos.y+global_diff.y);
        // this._target=new PIXI.Point(mouse_pos.x,mouse_pos.y);
    }
  }

  drawFunc(){
    this.lineStyle(this._thickness, this._border_color);
    this.drawPolygon(this._polygon);
    this.topBar.drawFunc();
    this.closeBtn.drawFunc();
    this.widget.drawFunc();
  }

  onClose(){
    // this.destroy({
    //   children:true
    // })
  }

  onOpen(){}
}
