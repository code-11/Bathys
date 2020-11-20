import * as PIXI from 'pixi.js';
// import * as GOWN from "gown";
import { Viewport } from 'pixi-viewport'

import Button from "./gui/Button";
import DualSlider from "./gui/DualSlider";
import Container from "./gui/Container";
import TimeControls from "./gui/TimeControls";

import EXPolygonObj from "./core/EXPolygonObj";
import EXCircleObj from "./core/EXCircleObj";

import Planet from "./Planet"
import ResourceManager from "./ResourceManager";
// import LandingChecker from "./LandingChecker";
import MouseMovementController from "./MouseMovementController";
import SpecifiedResourceAssignmentStrategy from "./SpecifiedResourceAssignmentStrategy";

export default class ExcelsiorApp{
  constructor(){
    this.app = new PIXI.Application({ antialias: true });
    document.body.appendChild(this.app.view);

    this.app.renderer.autoResize = true;
    this.app.renderer.resize(window.innerWidth, window.innerHeight);

    const viewport = new Viewport({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        worldWidth: 1000,
        worldHeight: 1000,

        interaction: this.app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    })

    const graphics = new PIXI.Graphics();
    graphics.interactive = true;
    graphics.hitArea = new PIXI.Rectangle(0, 0, 5000, 5000);

    const triangle=new EXPolygonObj();
    triangle.setPoints([[0,-15],[-10,15],[10,15]]);
    triangle.setColor(0xDE3249);
    triangle.init();

    viewport.follow(triangle);

    const moveCtrlTargetObj = new EXCircleObj();
    moveCtrlTargetObj._radius=5;
    moveCtrlTargetObj.setColor(0xDE3249);
    moveCtrlTargetObj.init();

    // const all_landing_checkers=[baseLandingChecker];

    const moveCtrl= new MouseMovementController([]);
    moveCtrl.viewport=viewport;
    moveCtrl.top_graphic=graphics;
    moveCtrl._ctrlObj=triangle; //PIXI.Graphics
    moveCtrl._speed=2;
    moveCtrl._parent_graphic = graphics;
    moveCtrl._renderer = this.app.renderer;
    moveCtrl._targetObj = moveCtrlTargetObj;
    moveCtrl.init();

    const timeControls = new TimeControls();

    const resourceManager = new ResourceManager();
    resourceManager.initResources();

    const planet1= new Planet(this.app.renderer);
    planet1.viewport=viewport;
    planet1.name="planet1";

    const planet2= new Planet(this.app.renderer);
    planet2.viewport=viewport;
    planet2.name="planet2";

    const planets=[planet1,planet2];

    const resourceAssigner = new SpecifiedResourceAssignmentStrategy(planets,resourceManager);
    resourceAssigner.assignResources();

    planet1.init();
    planet1.x=500;
    planet1.y=100;

    planet2.init();
    planet2.x=300;
    planet2.y=300;



    const slider= new DualSlider(-20,100);
    slider._renderer=this.app.renderer;
    slider.init();
    slider.x=200;
    slider.y=200;
    slider.drawFunc();

    // graphics.addChild(base);
    graphics.addChild(planet1);
    graphics.addChild(planet2);

    graphics.addChild(triangle);
    graphics.addChild(moveCtrlTargetObj);



    graphics.addChild(slider);
    // graphics.addChild(container);

    // graphics.drawRect(50, 50, 100, 100);
    viewport.addChild(graphics);
    // this.app.stage.addChild(graphics);
    this.app.stage.addChild(viewport);
    this.app.stage.addChild(timeControls);
    // this.app.stage.addChild(graphics);

    this.app.ticker.add(delta => {
      moveCtrl.update(timeControls,delta);
      timeControls.update(delta);
      planet1.checkLanding(triangle,moveCtrlTargetObj);
      planet2.checkLanding(triangle,moveCtrlTargetObj);
    });

    // const aeonTheme = new GOWN.ThemeParser("../../themes/assets/aeon_desktop/aeon_desktop.json");

  }
}
