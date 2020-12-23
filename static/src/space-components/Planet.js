import * as PIXI from 'pixi.js';

import Button from "./gui/Button";
import Slider from "./gui/Slider";
import Container from "./gui/Container";
import DualSlider from "./gui/DualSlider";
import PopupWindow from "./gui/PopupWindow";
import VerticalScrollWindow from "./gui/ScrollWindow";

import LandingChecker from "./LandingChecker";
import PlayerSaleManager from "./PlayerSaleManager";
import PlanetResourceManager from "./PlanetResourceManager";

import EXObj from "./core/EXObj";
import EXCircleObj from "./core/EXCircleObj"

export default class Planet extends EXObj{
  constructor(renderer){
    super();
    this.base=null;
    this.landingChecker=null
    this.landingIndicator=null;
    this.container=null;

    this.top_graphic=null;
    this.renderer=renderer;
    this.viewport=null;

    this.resourceManager=new PlanetResourceManager();
    this.saleManager = new PlayerSaleManager(this.resourceManager);
    this.saleManager.renderer=this.renderer;
  }

  createProductionHooks(){
    return this.resourceManager.createProductionHooks(this.saleManager);
  }

  setTopGraphic(top_graphic){
    this.top_graphic=top_graphic;
    this.saleManager.top_graphic=this.top_graphic;
  }

  checkLanding(ship,moveCtrlTargetObj){
    if(this.landingChecker!=null){
      this.landingChecker.checkLanding(ship,moveCtrlTargetObj);
    }
  }

  resetContainerPos(){
    this.container.x=35;
    this.container.y=-25;
  }

  init(){
    const base = new EXCircleObj();
    // base._origin = new PIXI.Point(500,50);
    base._radius=15;
    base.setColor(0x00FF00);
    base.name=this.name;
    base.init();
    base.viewport=this.viewport
    this.base=base;

    this.container=this.saleManager.initTradeMenu();

    const baseLandingCheckerIndicator = new EXCircleObj();
    baseLandingCheckerIndicator.x=20;
    baseLandingCheckerIndicator.y=-20;
    baseLandingCheckerIndicator._radius=5;
    baseLandingCheckerIndicator.setColor(0x0000FF);
    baseLandingCheckerIndicator.visible=false;
    baseLandingCheckerIndicator.buttonMode = true;
    baseLandingCheckerIndicator.interactive = true;
    baseLandingCheckerIndicator.on("click",(e)=>{
      this.container.visible=!this.container.visible;
      this.resetContainerPos();
      e.stopPropagation();
    });
    baseLandingCheckerIndicator.init();
    this.landingIndicator=baseLandingCheckerIndicator;

    const baseLandingChecker= new LandingChecker();
    baseLandingChecker._checkingIndicator=baseLandingCheckerIndicator;
    baseLandingChecker._parent=this;
    baseLandingChecker._container=this.container;
    this.landingChecker=baseLandingChecker;

    this.addChild(base);
    this.addChild(this.container);
    this.addChild(baseLandingCheckerIndicator);

  }
}
