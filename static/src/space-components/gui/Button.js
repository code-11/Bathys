import * as PIXI from 'pixi.js';
import EXPolygonObj from "../core/EXPolygonObj";
import GuiUtil from "./GuiUtil"

export default class Button extends EXPolygonObj{
  constructor(text, text_opt){
    super();
    this._text=text;
    this._textObj=null;
    this._text_opt=text_opt;
  }

//Props:
//thickness
//border_color
//fill_color
//padding

  drawFunc(){
    this.lineStyle(this._thickness, this._border_color);
    this.drawPolygon(this._polygon);
    this._textObj.visible=true;
  }

  init(){
    const {width, height}=GuiUtil.textSize(this._text, this._text_opt.fontSize+"px "+this._text_opt.fontFamily);
    this._textObj = new PIXI.Text(this._text, this._text_opt);
    const padding = this._padding;
    this._textObj.position.x=padding;
    this._textObj.position.y=padding;
    this._textObj.visible=false;
    this._polygon=new PIXI.Polygon([
      new PIXI.Point(0,0),
      new PIXI.Point(0,height+2*padding),
      new PIXI.Point(width+2*padding,height+2*padding),
      new PIXI.Point(width+2*padding,0),
    ]);
    this._height=height+2*padding;
    this._width = width+2*padding;

    // this.drawFunc();
    this.addChild(this._textObj);
    this.setHitArea();
    // let text = new PIXI.Text('This is a PixiJS text',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
  }

  setText(text){
    this._text=text;
    this._textObj.text=text;
  }

  rapidTextRefresh(txt){
    this.rapidTextRefresh1(txt);
    this.rapidTextRefresh2(txt);
  }

  rapidTextRefresh1(txt){
    this.clear();
    this._textObj.visible=false;
    this.setText(txt);
    this.init();
  }

  rapidTextRefresh2(txt){
    this.drawFunc();
    this._textObj.visible=true;
  }

}
