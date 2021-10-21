import LandingChecker from "./LandingChecker";
export default class InfoLandingCheckDecorator extends LandingChecker{
  constructor(parentChecker){
    super();
    this._parentChecker=parentChecker;
    this._checkingIndicator=null;
    this._container=null;
  }

  onLanding(ship){
    this._parentChecker.onLanding(ship);
    this._checkingIndicator.visible=true;
    this._parent.infoManager.linkShip(ship);
  }

  onNotLanding(ship){
    this._parentChecker.onNotLanding(ship);
    this._checkingIndicator.visible=false;
    this._parent.infoManager.unlinkShip(ship);
    if(this._container!=null){
      this._container.visible=false;
    }
  }
}
