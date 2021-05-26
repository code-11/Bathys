import * as PIXI from 'pixi.js'
export default class LandingChecker{
  constructor(){
    this._parent=null;
  }

  // ShipLocation=Pixi.Point
  // ShipDestination=Pixi.Point
  checkLanding(ship,shipDestination){
    if(this._parent.base.containsFunc(ship.x,ship.y)){
      this.onLanding(ship);
    }else{
      this.onNotLanding(ship);
    }
  }

  onLanding(ship){
  }

  onNotLanding(ship){
  }
}
