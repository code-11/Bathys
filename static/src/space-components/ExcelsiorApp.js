import * as PIXI from 'pixi.js';
// import * as GOWN from "gown";
import { Viewport } from 'pixi-viewport'

import Button from "./gui/Button";
import DualSlider from "./gui/DualSlider";
import Container from "./gui/Container";
import PopupWindow from "./gui/PopupWindow";
import PlayerInventory from "./gui/PlayerInventory";
import TimeControls from "./gui/TimeControls";
import VerticalScroll from "./gui/VerticalScroll";
import VerticalScrollWindow from "./gui/ScrollWindow";

import EXPolygonObj from "./core/EXPolygonObj";
import EXCircleObj from "./core/EXCircleObj";

import PlayerShip from "./PlayerShip";
import Planet from "./Planet"
import ResourceManager from "./ResourceManager";
// import LandingChecker from "./LandingChecker";
import MouseMovementController from "./MouseMovementController";
import SpecifiedResourceAssignmentStrategy from "./SpecifiedResourceAssignmentStrategy";
import FocusResourceAssignmentStrategy from "./FocusResourceAssignmentStrategy";
import PlanetCreationStrategy from "./PlanetCreationStrategy";

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
    // graphics.drawRect(new PIXI.Rectangle(2, 2, 20, 20));

//-----PLAYER AND SHIP INITITIALIZATION-----
    const playerShip=new PlayerShip();
    playerShip.setPoints([[0,-15],[-10,15],[10,15]]);
    playerShip.setColor(0xDE3249);
    playerShip.init();

    viewport.follow(playerShip);

    const moveCtrlTargetObj = new EXCircleObj();
    moveCtrlTargetObj._radius=5;
    moveCtrlTargetObj.setColor(0xDE3249);
    moveCtrlTargetObj.init();

    // const all_landing_checkers=[baseLandingChecker];

    const moveCtrl= new MouseMovementController([]);
    moveCtrl.viewport=viewport;
    moveCtrl.top_graphic=graphics;
    moveCtrl._ctrlObj=playerShip; //PIXI.Graphics
    moveCtrl._speed=2;
    moveCtrl._parent_graphic = graphics;
    moveCtrl._renderer = this.app.renderer;
    moveCtrl._targetObj = moveCtrlTargetObj;
    moveCtrl.init();



//-----RESOURCE INITITIALIZATION-----

    const resourceManager = new ResourceManager();
    resourceManager.initResources();
    resourceManager.initFocuses();
    resourceManager.initResourceGraph();

//-----PLANET INITITIALIZATION-----

    const planetCreator = new PlanetCreationStrategy(this.app.renderer, graphics, viewport)
    const planets=planetCreator.createPlanets(Object.values(resourceManager.focuses_by_name),Object.values(resourceManager.focuses_by_name).length,5000,5000);

//-----PLANET RESOURCE INITIALIZATION-----

    const resourceAssigner = new FocusResourceAssignmentStrategy(planets, playerShip, resourceManager);
    resourceAssigner.assignProduction();
    resourceAssigner.assignResources();
    resourceAssigner.assignResourcesWanted();

    // const resourceAssigner = new SpecifiedResourceAssignmentStrategy(planets,playerShip,resourceManager);
    // resourceAssigner.assignResources();
    // resourceAssigner.assignProduction();
    // resourceAssigner.assignResourcesWanted();

    planets.forEach(p => p.init());

//-----HUD INITITIALIZATION-----

    const hud= new Container(1,2);
    hud._thickness=1
    hud._border_color=0xAAAAAA;

    const timeControls = new TimeControls();
    planets.forEach(p => timeControls.addTimeHooks(p.createProductionHooks()));

    const playerInventory = new PlayerInventory(resourceManager,playerShip);

    hud.addElement(0,0,0,0,timeControls);
    hud.addElement(0,1,0,1,playerInventory);
    hud.init();
    hud.drawFunc();

    // const slider= new DualSlider(-20,100);
    // slider._renderer=this.app.renderer;
    //
    // const slider2= new DualSlider(-20,100);
    // slider2._renderer=this.app.renderer;
    //
    // const slider3= new DualSlider(-20,100);
    // slider3._renderer=this.app.renderer;
    //
    // const container = new Container(1,3);
    //
    // container._border_color=0x00AA00;
    // container._thickness=0;
    // container._padding=5;
    //
    // container.addElement(0,0,0,0,slider);
    // container.addElement(0,1,0,1,slider2);
    // container.addElement(0,2,0,2,slider3);
    //
    // const popupWindow = new PopupWindow(container);
    // popupWindow.top_graphic=graphics;
    // popupWindow._renderer=this.app.renderer;
    // popupWindow.init();
    // popupWindow.drawFunc();



    //
    // const scrollWindow = new VerticalScrollWindow(container,this.app.renderer);
    // scrollWindow._height=100;
    // scrollWindow._thickness=3;
    // scrollWindow._border_color=0xFF0000;
    //
    // container.addElement(0,0,0,0,slider);
    // container.addElement(0,1,0,1,slider2);
    // container.addElement(0,2,0,2,slider3);
    //
    // scrollWindow.init();
    // scrollWindow.x=50;
    // scrollWindow.y=50;
    // scrollWindow.drawFunc();

    // const slider = new VerticalScroll();
    // slider._renderer= this.app.renderer;
    // slider.init();
    // slider.x=200;
    // slider.y=200;
    // slider.drawFunc();

    // graphics.addChild(scrollWindow);
    // graphics.addChild(popupWindow);

    planets.forEach(p => graphics.addChild(p));

    graphics.addChild(playerShip);
    graphics.addChild(moveCtrlTargetObj);



    // graphics.addChild(slider);
    // graphics.addChild(container);
    graphics.lineStyle(5, 0xFFFFFF);
    graphics.drawRect(3, 3, 5000, 5000);
    viewport.addChild(graphics);
    // this.app.stage.addChild(graphics);
    this.app.stage.addChild(viewport);
    this.app.stage.addChild(hud);
    // this.app.stage.addChild(graphics);

    this.app.ticker.add(delta => {
      moveCtrl.update(timeControls,delta);
      timeControls.update(delta);
      planets.forEach(p => p.checkLanding(playerShip,moveCtrlTargetObj));
    });

    // const aeonTheme = new GOWN.ThemeParser("../../themes/assets/aeon_desktop/aeon_desktop.json");

  }
}
