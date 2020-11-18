import * as PIXI from 'pixi.js';
import EXPolygonObj from "../core/EXPolygonObj";
import Button from "./Button";
export default class Slider extends EXPolygonObj{
  constructor(minVal=0,maxVal=1){
    super();
    this._normVal=.5;
    this._minVal=minVal;
    this._maxVal=maxVal;

    this._thickness=1;
    this._outerColor=0xFFFFFF;
    this._innerColor=0xAAAAAA;

    this._width=150; //pixels
    this._height=15; //pixels

    this._shouldTrack=false;
  }

  reposition(newVal){

  }

  getMult(){
    return this._maxVal-this._minVal;
  }

  getShift(){
    return this._minVal;
  }

  getVal(){
    return (this._normVal * this.getMult()) + this._minVal;
  }

  refreshValLbl(){
    const txt=Number.parseFloat(this.getVal()).toFixed(2);
    this._valLbl.rapidTextRefresh1(txt);
    const innerWidth=this._width*this._normVal;
    const half_text_width=this._valLbl._width/2;
    this._valLbl.x = innerWidth- half_text_width;
    this._valLbl.rapidTextRefresh2(txt);
  }

  refreshSlide(slideBox){
    slideBox.clear();

    const innerWidth=this._width*this._normVal;

    const slideMarginX=3;
    const slideMarginY=2;
    const slide = new PIXI.Polygon([
      new PIXI.Point(innerWidth-slideMarginX,-slideMarginY),
      new PIXI.Point(innerWidth-slideMarginX, this._height+slideMarginY),
      new PIXI.Point(innerWidth+slideMarginX, this._height+slideMarginY),
      new PIXI.Point(innerWidth+slideMarginX, -slideMarginY),
    ]);

    this._slideBox.lineStyle(0, this._outerColor);
    this._slideBox.beginFill(0xFF0000);
    this._slideBox.drawPolygon(slide);
    this._slideBox.endFill();

    this._slideBox.hitArea=slide;
    this._slideBox.interactive=true;
    this._slideBox.buttonMode=true;

    this.refreshValLbl();
  }

  refreshInner(){
      this._innerBox.clear();
      const innerWidth=this._width*this._normVal;

      const inner = new PIXI.Polygon([
            new PIXI.Point(0,0),
            new PIXI.Point(0,this._height),
            new PIXI.Point(innerWidth,this._height),
            new PIXI.Point(innerWidth,0),
      ]);

      this._innerBox.lineStyle(0, this._outerColor);
      this._innerBox.beginFill(this._innerColor);
      this._innerBox.drawPolygon(inner);
      this._innerBox.endFill();
  }

  onSlide(normVal){}

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
      this.refreshInner();
    }
  }

  init(){
    this._border =new PIXI.Polygon([
          new PIXI.Point(0,0),
          new PIXI.Point(0,this._height),
          new PIXI.Point(this._width,this._height),
          new PIXI.Point(this._width,0),
    ]);

    this._slideBox= new PIXI.Graphics();
    this._slideBox.interactive=true;
    this._slideBox.buttonMode=true;

    this._innerBox= new PIXI.Graphics();

    this._valLbl = new Button(this.getVal(), {
      fontFamily : 'Arial',
      fontSize: 18,
      fill : 0xff1010,
      align : 'center'
    });
    this._valLbl._thickness=2;
    this._valLbl._border_color=0xff1010;
    this._valLbl._padding=5;
    this._valLbl.init();
    this._valLbl.y=this._height+4;
    // this._valLbl.visible=false;

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
    this.addChild(this._valLbl);
  }

  drawFunc(){
    this.refreshSlide(this._slideBox);
    this.refreshInner(this._innerBox);
    this.lineStyle(this._thickness, this._outerColor);
    this.drawPolygon(this._border);
  }
}
