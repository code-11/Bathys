import EXCircleObj from "./EXCircleObj";

export default class WrapperObj extends EXCircleObj{
  constructor(wrappedObj){
    super();
    this.wrappedObj=wrappedObj;
  }

  setX(newX){
    this.wrappedObj.x=newX;
    this.x=newX;
  }

  setY(newY){
    this.wrappedObj.y=newY;
    this.y=newY;
  }

  setRadius(newRadius){
    this.wrappedObj._radius=newRadius;
    this._radius=newRadius;
  }

  setRotation(newRotation){
    this.wrappedObj.rotation=newRotation;
    this.rotation=newRotation;
  }

  getDelegate(){
    return this.wrappedObj;
  }


}
