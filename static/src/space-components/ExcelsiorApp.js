import * as PIXI from 'pixi.js'
import EXPolygonObj from "./EXPolygonObj";
import EXCircleObj from "./EXCircleObj";
import LandingChecker from "./LandingChecker";
import MouseMovementController from "./MouseMovementController";

export default class ExcelsiorApp{
  constructor(){
    this.app = new PIXI.Application({ antialias: true });
    document.body.appendChild(this.app.view);

    this.app.renderer.autoResize = true;
    this.app.renderer.resize(window.innerWidth, window.innerHeight);

    const graphics = new PIXI.Graphics();
    graphics.interactive = true;

    const triangle=new EXPolygonObj();
    triangle.setPoints([[0,-15],[-10,15],[10,15]]);
    triangle.setColor(0xDE3249);
    triangle.init();

    const moveCtrlTargetObj = new EXCircleObj();
    moveCtrlTargetObj._origin=new PIXI.Point(0,0);
    moveCtrlTargetObj._radius=5;
    moveCtrlTargetObj.setColor(0xDE3249);
    moveCtrlTargetObj.init();

    const base = new EXCircleObj();
    base._origin = new PIXI.Point(500,500);
    base._radius=15;
    base.setColor(0x00FF00);
    base.init();

    const baseLandingCheckerIndicator = new EXCircleObj();
    base.addChild(baseLandingCheckerIndicator);
    baseLandingCheckerIndicator._origin =new PIXI.Point(base._origin.x+30,base._origin.y-30);
    baseLandingCheckerIndicator._radius=5;
    baseLandingCheckerIndicator.setColor(0x0000FF);
    baseLandingCheckerIndicator.visible=false;
    baseLandingCheckerIndicator.init();

    const baseLandingChecker= new LandingChecker();
    baseLandingChecker._checkingIndicator=baseLandingCheckerIndicator;
    baseLandingChecker._parent=base;


    const moveCtrl= new MouseMovementController();
    moveCtrl._ctrlObj=triangle; //PIXI.Graphics
    moveCtrl._speed=2;
    moveCtrl._renderer = this.app.renderer;
    moveCtrl._targetObj = moveCtrlTargetObj;
    moveCtrl.init();

    graphics.addChild(base);
    graphics.addChild(triangle);
    graphics.addChild(moveCtrlTargetObj);
    // graphics.drawRect(50, 50, 100, 100);
    this.app.stage.addChild(graphics);

    this.app.ticker.add(delta => {
      moveCtrl.update();
      baseLandingChecker.checkLanding(triangle,moveCtrlTargetObj);
    });
  }
}
