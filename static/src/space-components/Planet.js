import * as PIXI from 'pixi.js';

import Button from "./gui/Button";
import Slider from "./gui/Slider";
import Container from "./gui/Container";
import ScrollWindow from "./gui/ScrollWindow";

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
    const resources=this.resourceManager.resources;
    const container = new Container(4,resources.length);
    container.x=35;
    container.y=-25;
    container._border_color=0xAAAAAA;
    container._thickness=1
    container._padding=5;
    container.visible=false;

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

    const scrollWindow = new ScrollWindow(container);
    scrollWindow.init();
    scrollWindow.drawFunc();
    this.container=scrollWindow;

    // container.init();
    // container.drawFunc();
    // this.container=container;


    // const slider= new Slider();
    // // slider.position.x=200;
    // // slider.position.y=200;
    // slider._renderer=this.renderer;
    // // slider.init();
    //
    // const btn2 = new Button("TEST", {
    //   fontFamily : 'Arial',
    //   fontSize: 24,
    //   fill : 0xff1010,
    //   align : 'center'
    // });
    // btn2._thickness=2;
    // btn2._border_color=0xff1010;
    // btn2._padding=5;
    //
    // const btn3 = new Button("TEST2", {
    //   fontFamily : 'Arial',
    //   fontSize: 24,
    //   fill : 0xff1010,
    //   align : 'center'
    // });
    // btn3._thickness=2;
    // btn3._border_color=0xff1010;
    // btn3._padding=5;
    //
    // const btn4 = new Button("TEST3", {
    //   fontFamily : 'Arial',
    //   fontSize: 24,
    //   fill : 0xff1010,
    //   align : 'center'
    // });
    // btn4._thickness=2;
    // btn4._border_color=0xff1010;
    // btn4._padding=5;
    //
    // const container = new Container(3,3);
    // container.x=35;
    // container.y=-25;
    // container._border_color=0xAAAAAA;
    // container._thickness=1
    // container._padding=10;
    // container.visible=false;
    // container.addElement(0,0,0,0,btn2);
    // container.addElement(1,1,1,1,btn3);
    // container.addElement(2,2,2,2,btn4);
    // container.addElement(1,0,2,0,slider);
    // container.init();
    // container.drawFunc();
    // this.container=container;
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
