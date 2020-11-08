import * as PIXI from 'pixi.js';
// import * as GOWN from "gown";

import Button from "./gui/Button";
import Slider from "./gui/Slider";
import Container from "./gui/Container";

import EXPolygonObj from "./core/EXPolygonObj";
import EXCircleObj from "./core/EXCircleObj";
import Planet from "./Planet"
// import LandingChecker from "./LandingChecker";
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
    moveCtrlTargetObj._radius=5;
    moveCtrlTargetObj.setColor(0xDE3249);
    moveCtrlTargetObj.init();

    // const all_landing_checkers=[baseLandingChecker];

    const moveCtrl= new MouseMovementController([]);
    moveCtrl._ctrlObj=triangle; //PIXI.Graphics
    moveCtrl._speed=2;
    moveCtrl._parent_graphic = graphics;
    moveCtrl._renderer = this.app.renderer;
    moveCtrl._targetObj = moveCtrlTargetObj;
    moveCtrl.init();

    const planet1= new Planet(this.app.renderer);
    planet1.init();
    planet1.x=500;
    planet1.y=100;

    const planet2= new Planet(this.app.renderer);
    planet2.init();
    planet2.x=300;
    planet2.y=300;

    // graphics.addChild(base);
    graphics.addChild(planet1);
    graphics.addChild(planet2);

    graphics.addChild(triangle);
    graphics.addChild(moveCtrlTargetObj);



    // graphics.addChild(slider);
    // graphics.addChild(container);

    // graphics.drawRect(50, 50, 100, 100);
    this.app.stage.addChild(graphics);

    this.app.ticker.add(delta => {
      moveCtrl.update();
      planet1.checkLanding(triangle,moveCtrlTargetObj);
      planet2.checkLanding(triangle,moveCtrlTargetObj);
    });

    // const aeonTheme = new GOWN.ThemeParser("../../themes/assets/aeon_desktop/aeon_desktop.json");

  }
}
