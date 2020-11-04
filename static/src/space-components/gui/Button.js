import * as PIXI from 'pixi.js';
import EXPolygonObj from "../core/EXPolygonObj";
import GuiUtil from "./GuiUtil"

export default class Button extends EXPolygonObj{
  constructor(text, text_opt){
    super();
    this._text=text;
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
  }

  init(){
    const {width, height}=GuiUtil.textSize(this._text, this._text_opt.fontSize+"px "+this._text_opt.fontFamily);
    const textObj = new PIXI.Text(this._text, this._text_opt);
    const padding = this._padding;
    textObj.position.x=padding;
    textObj.position.y=padding;
    this._polygon=new PIXI.Polygon([
      new PIXI.Point(0,0),
      new PIXI.Point(0,height+2*padding),
      new PIXI.Point(width+2*padding,height+2*padding),
      new PIXI.Point(width+2*padding,0),
    ]);
    this._height=height+2*padding;
    this._width = width+2*padding;

    // this.drawFunc();
    this.addChild(textObj);
    this.setHitArea();
    // let text = new PIXI.Text('This is a PixiJS text',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});

  }
}
