import EXObj from "./ExObj";
import * as PIXI from 'pixi.js'

export default class EXPolygonObj extends EXObj{
  constructor(){
    super();
    this._polygon=null;
  }

  drawFunc(){
    this.drawPolygon(this._polygon);
  }

  setPoints(points){
    if(points!=undefined){
      const pointList=[];
      points.forEach(pair=>{
          pointList.push(new PIXI.Point(pair[0],pair[1]));
      });
      this._polygon=new PIXI.Polygon(pointList);
    }
  }

  setHitArea(){
    this.hitArea=this._polygon;
  }

}
