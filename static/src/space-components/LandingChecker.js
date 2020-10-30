import * as PIXI from 'pixi.js'
export default class LandingChecker{
  constructor(){
    this._checkingIndicator=null;
    this._parent=null;
  }

  // ShipLocation=Pixi.Point
  // ShipDestination=Pixi.Point
  checkLanding(shipLocation,shipDestination){
    if(this._parent.containsFunc(shipLocation.x,shipLocation.y)){
      this.onLanding();
    }else{
      this.onNotLanding();
    }
  }

  onLanding(){
    this._checkingIndicator.visible=true;
  }

  onNotLanding(){
    this._checkingIndicator.visible=false;
  }
}
