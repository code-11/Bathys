import * as PIXI from 'pixi.js';
// import * as GOWN from "gown";

import Button from "./gui/Button";
import Slider from "./gui/Slider";
import Container from "./gui/Container";

import EXPolygonObj from "./core/EXPolygonObj";
import EXCircleObj from "./core/EXCircleObj";
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


        const slider= new Slider();
        // slider.position.x=200;
        // slider.position.y=200;
        slider._renderer=this.app.renderer;
        // slider.init();

        const btn2 = new Button("TEST", {
          fontFamily : 'Arial',
          fontSize: 24,
          fill : 0xff1010,
          align : 'center'
        });
        btn2._thickness=2;
        btn2._border_color=0xff1010;
        btn2._padding=5;

        const btn3 = new Button("TEST2", {
          fontFamily : 'Arial',
          fontSize: 24,
          fill : 0xff1010,
          align : 'center'
        });
        btn3._thickness=2;
        btn3._border_color=0xff1010;
        btn3._padding=5;

        const btn4 = new Button("TEST3", {
          fontFamily : 'Arial',
          fontSize: 24,
          fill : 0xff1010,
          align : 'center'
        });
        btn4._thickness=2;
        btn4._border_color=0xff1010;
        btn4._padding=5;

        const container = new Container(3,3);
        container.position.x=base._origin.x+35;
        container.position.y=base._origin.y-25;
        container._border_color=0xAAAAAA;
        container._thickness=1
        container._padding=10;
        container.visible=false;
        container.addElement(0,0,0,0,btn2);
        container.addElement(1,1,1,1,btn3);
        container.addElement(2,2,2,2,btn4);
        container.addElement(1,0,2,0,slider);
        container.init();
        container.drawFunc();

    const baseLandingCheckerIndicator = new EXCircleObj();
    base.addChild(baseLandingCheckerIndicator);
    baseLandingCheckerIndicator._origin =new PIXI.Point(base._origin.x+30,base._origin.y-30);
    baseLandingCheckerIndicator._radius=5;
    baseLandingCheckerIndicator.setColor(0x0000FF);
    baseLandingCheckerIndicator.visible=false;
    baseLandingCheckerIndicator.buttonMode = true;
    baseLandingCheckerIndicator.interactive = true;
    baseLandingCheckerIndicator.on("click",(e)=>{
      container.visible=!container.visible;
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

    const btn = new Button("TEST", {
      fontFamily : 'Arial',
      fontSize: 24,
      fill : 0xff1010,
      align : 'center'
    });
    btn._thickness=2;
    btn._border_color=0xff1010;
    btn._padding=5;
    btn.buttonMode=true;
    btn.interactive=true;
    btn.position.x=100;
    btn.position.y=100;
    btn.on("click",(e)=>{
      console.log("test");
      e.stopPropagation();
    });
    btn.init();

    graphics.addChild(base);
    graphics.addChild(triangle);
    graphics.addChild(moveCtrlTargetObj);

    graphics.addChild(btn);
    // graphics.addChild(slider);
    graphics.addChild(container);

    // graphics.drawRect(50, 50, 100, 100);
    this.app.stage.addChild(graphics);

    this.app.ticker.add(delta => {
      moveCtrl.update();
      baseLandingChecker.checkLanding(triangle,moveCtrlTargetObj);
    });

    // const aeonTheme = new GOWN.ThemeParser("../../themes/assets/aeon_desktop/aeon_desktop.json");

  }
}
