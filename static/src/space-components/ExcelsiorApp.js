import * as PIXI from 'pixi.js';
// import * as GOWN from "gown";
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
    graphics.hitArea = new PIXI.Rectangle(0, 0, 5000, 5000);

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
    base._origin = new PIXI.Point(500,50);
    base._radius=15;
    base.setColor(0x00FF00);
    base.init();

    const baseLandingCheckerIndicator = new EXCircleObj();
    base.addChild(baseLandingCheckerIndicator);
    baseLandingCheckerIndicator._origin =new PIXI.Point(base._origin.x+30,base._origin.y-30);
    baseLandingCheckerIndicator._radius=5;
    baseLandingCheckerIndicator.setColor(0x0000FF);
    baseLandingCheckerIndicator.visible=false;
    baseLandingCheckerIndicator.buttonMode = true;
    baseLandingCheckerIndicator.interactive = true;
    baseLandingCheckerIndicator.on("click",(e)=>{
      e.stopPropagation();
    });
    baseLandingCheckerIndicator.init();

    const baseLandingChecker= new LandingChecker();
    baseLandingChecker._checkingIndicator=baseLandingCheckerIndicator;
    baseLandingChecker._parent=base;

    const all_landing_checkers=[baseLandingChecker];

    const moveCtrl= new MouseMovementController(all_landing_checkers);
    moveCtrl._ctrlObj=triangle; //PIXI.Graphics
    moveCtrl._speed=2;
    moveCtrl._parent_graphic = graphics;
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

    // const aeonTheme = new GOWN.ThemeParser("../../themes/assets/aeon_desktop/aeon_desktop.json");

  }
}
