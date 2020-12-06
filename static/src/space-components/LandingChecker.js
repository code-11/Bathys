import * as PIXI from 'pixi.js'
export default class LandingChecker{
  constructor(){
    this._checkingIndicator=null;
    this._parent=null;
    this._container=null;
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
    this._checkingIndicator.visible=true;
    this._parent.saleManager.linkShip(ship);
  }

  onNotLanding(ship){
    this._checkingIndicator.visible=false;
    this._parent.saleManager.unlinkShip(ship);
    if(this._container!=null){
      this._container.visible=false;
    }
  }
}
