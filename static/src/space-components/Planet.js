import * as PIXI from 'pixi.js';

import Button from "./gui/Button";
import Slider from "./gui/Slider";
import Container from "./gui/Container";
import VerticalScrollWindow from "./gui/ScrollWindow";

import LandingChecker from "./LandingChecker";
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

    this.renderer=renderer;
    this.viewport=null;

    this.resourceManager=new PlanetResourceManager();
  }

  checkLanding(ship,moveCtrlTargetObj){
    if(this.landingChecker!=null){
      this.landingChecker.checkLanding(ship,moveCtrlTargetObj);
    }
  }


  initTradeMenu(){
    const resources=this.resourceManager.globalResourceManager.resources;
    const container = new Container(4,resources.length);
    // container.x=35;
    // container.y=-25;
    container._border_color=0xAAAAAA;
    container._thickness=1
    container._padding=5;
    // container.visible=false;

    resources.forEach((res,i)=>{
      const nameLbl = new Button(res.name, {
        fontFamily : 'Arial',
        fontSize: 12,
        fill : 0xff1010,
        align : 'center'
      });
      nameLbl._thickness=2;
      nameLbl._border_color=0xff1010;
      nameLbl._padding=5;

      const shipAmountLbl = new Button("Ship#", {
        fontFamily : 'Arial',
        fontSize: 12,
        fill : 0xff1010,
        align : 'center'
      });
      shipAmountLbl._thickness=2;
      shipAmountLbl._border_color=0xff1010;
      shipAmountLbl._padding=5;

      const priceLbl = new Button("Price", {
        fontFamily : 'Arial',
        fontSize: 12,
        fill : 0xff1010,
        align : 'center'
      });
      priceLbl._thickness=2;
      priceLbl._border_color=0xff1010;
      priceLbl._padding=5;

      const planetAmountLbl = new Button("Planet#", {
        fontFamily : 'Arial',
        fontSize: 12,
        fill : 0xff1010,
        align : 'center'
      });
      planetAmountLbl._thickness=2;
      planetAmountLbl._border_color=0xff1010;
      planetAmountLbl._padding=5;

      container.addElement(0,i,0,i,nameLbl);
      container.addElement(1,i,1,i,shipAmountLbl);
      container.addElement(2,i,2,i,priceLbl);
      container.addElement(3,i,3,i,planetAmountLbl);
    });

    const scrollWindow = new VerticalScrollWindow(container,this.renderer);
    scrollWindow._height=300;
    scrollWindow._thickness=1;
    scrollWindow._border_color=0xFF0000;
    scrollWindow.x=35;
    scrollWindow.y=-25;
    scrollWindow.init();
    scrollWindow.drawFunc();

    this.container=scrollWindow;
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

    this.initTradeMenu();

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
      e.stopPropagation();
    });
    baseLandingCheckerIndicator.init();
    this.landingIndicator=baseLandingCheckerIndicator;

    const baseLandingChecker= new LandingChecker();
    baseLandingChecker._checkingIndicator=baseLandingCheckerIndicator;
    baseLandingChecker._parent=base;
    baseLandingChecker._container=this.container;
    this.landingChecker=baseLandingChecker;

    this.addChild(base);
    this.addChild(this.container);
    this.addChild(baseLandingCheckerIndicator);

  }
}
