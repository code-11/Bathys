import EXObj from "./EXObj";
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

  getPoints(){
    const toReturn =[];
    for(let i=0;i<this._polygon.points.length;i+=2){
      const x=this._polygon.points[i];
      const y=this._polygon.points[i+1];
      toReturn.push([x,y]);
    }
    return toReturn;
  }

  setHitArea(){
    this.hitArea=this._polygon;
  }

}
