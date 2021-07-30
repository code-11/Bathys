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

  setColor(newColor){
    this.wrappedObj.setColor(newColor);
    this.setColor(newColor);
  }

  setName(newName){
    this.wrappedObj.name=newName;
    this.name=newName+"-proxy";
  }

  init(){
    this.wrappedObj.init();
    this.init();
  }

  getDelegate(){
    return this.wrappedObj;
  }


}
