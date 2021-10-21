import * as PIXI from 'pixi.js';
// import * as GOWN from "gown";
import { Viewport } from 'pixi-viewport'

import Button from "../gui/Button";
import DualSlider from "../gui/DualSlider";
import Container from "../gui/Container";
import PopupWindow from "../gui/PopupWindow";
import PlayerInventory from "../gui/PlayerInventory";
import TimeControls from "../gui/TimeControls";
import Minimap from "../gui/Minimap";
import VerticalScroll from "../gui/VerticalScroll";
import VerticalScrollWindow from "../gui/ScrollWindow";

import EXPolygonObj from "../core/EXPolygonObj";
import EXCircleObj from "../core/EXCircleObj";

import PlayerShip from "../PlayerShip";
import Planet from "../Planet"
import TimeHook from "../TimeHook";
import ResourceManager from "../ResourceManager";
// import LandingChecker from "./LandingChecker";
import MouseMovementController from "../MouseMovementController";
import SpecifiedResourceAssignmentStrategy from "../SpecifiedResourceAssignmentStrategy";
import FocusResourceAssignmentStrategy from "../FocusResourceAssignmentStrategy";
import RandomPlanetCreationStrategy from "../RandomPlanetCreationStrategy";

export default class Level{

  getViewWidth(){
    console.error("getViewWidth is undefined");
  }

  getViewHeight(){
    console.error("getViewHeight is undefined");
  }

  getLevelWidth(){
    console.error("getLevelWidth is undefined");
  }

  getLevelHeight(){
    console.error("getLevelHeight is undefined");
  }

  getStartingLocation(){
    console.error("getStartingLocation is undefined");
  }

  planetInitialization(graphics, viewport, resourceManager, playerShip){
    console.error("planetInitialization is undefined");
  }

  cpusInit(){
    console.error("cpusInit is undefined");
  }

  constructor(){
    this.app = new PIXI.Application({ antialias: true });
    document.body.appendChild(this.app.view);

    this.app.renderer.autoResize = true;
    this.app.renderer.resize(window.innerWidth, window.innerHeight);

    const viewport = new Viewport({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        worldWidth: this.getViewWidth(),
        worldHeight: this.getViewHeight(),

        interaction: this.app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    })

    const graphics = new PIXI.Graphics();
    graphics.interactive = true;
    graphics.hitArea = new PIXI.Rectangle(0, 0, this.getLevelWidth(), this.getLevelHeight());
    // graphics.drawRect(new PIXI.Rectangle(2, 2, 20, 20));

    const minimap = new Minimap(100,100, this.getLevelWidth(),this.getLevelHeight());
    minimap.interactive = false;

    const shipIdToIcon={};

//-----PLAYER AND SHIP INITITIALIZATION-----
    const playerShip=new PlayerShip("playerShip");
    playerShip.init();

    const playerShipIcon=playerShip.makeMinimapIcon();
    playerShipIcon.init();
    minimap.addChild(playerShipIcon);
    shipIdToIcon[playerShip.getShipId()]=playerShipIcon;

    viewport.follow(playerShip);

    const moveCtrlTargetObj = new EXCircleObj();
    moveCtrlTargetObj._radius=5;
    moveCtrlTargetObj.setColor(0x0099ff);
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

    const {px,py} = this.getStartingLocation();
    playerShip.x=px;
    playerShip.y=py;

//-----RESOURCE INITITIALIZATION-----

    const resourceManager = new ResourceManager();
    resourceManager.initResources();
    resourceManager.initFocuses();
    resourceManager.initResourceGraph();

    playerShip.resourceManager.globalResourceManager=resourceManager;


//-----PLANET INITITIALIZATION-----
    const planets=this.planetInitialization(graphics, viewport, resourceManager, playerShip)
    planets.forEach(p => p.init());


//-----AI INITIALIZATION-----
    const cpuShips=this.cpusInit(planets, resourceManager);
    cpuShips.forEach(s=>s.init());

//-----HUD INITITIALIZATION-----

    const hud= new Container(1,2);
    hud._thickness=1
    hud._border_color=0xAAAAAA;

    const timeControls = new TimeControls();
    planets.forEach(p => timeControls.addTimeHooks(p.createProductionHooks()));
    planets.forEach(p => timeControls.addTimeHooks(p.createDevelopmentHooks()));
    cpuShips.forEach(cpuShip=> timeControls.addTimeHook(new TimeHook({
      hours:1
    },()=>{
      cpuShip.evalStrategy(planets, resourceManager);
    })));


    const playerInventory = new PlayerInventory(resourceManager,playerShip);

    hud.addElement(0,0,0,0,timeControls);
    hud.addElement(0,1,0,1,playerInventory);
    hud.init();
    hud.drawFunc();

    //Add planets to graphics and minimap
    planets.forEach(p => {
      graphics.addChild(p);
      const icon=p.makeMinimapIcon();
      icon.init();
      minimap.addChild(icon);
    });

    //Put it in the corner;
    minimap.x=window.innerWidth-(minimap._width*2+20);
    minimap.y=window.innerHeight-(minimap._height*2+20);
    minimap.init();

    graphics.addChild(playerShip);
    // minimap.addChild(playerShip);
    graphics.addChild(moveCtrlTargetObj);

    cpuShips.forEach(ship=> {
      graphics.addChild(ship);
      const icon = ship.makeMinimapIcon();
      icon.init();
      minimap.addChild(icon);
      shipIdToIcon[ship.getShipId()]=icon;
    });


    // graphics.addChild(slider);
    // graphics.addChild(container);
    graphics.lineStyle(5, 0xFFFFFF);
    graphics.drawRect(3, 3, this.getLevelWidth(), this.getLevelHeight());
    viewport.addChild(graphics);

    this.app.stage.addChild(viewport);
    this.app.stage.addChild(hud);
    this.app.stage.addChild(minimap);
    // this.app.stage.addChild(graphics);

    this.app.ticker.add(delta => {
      moveCtrl.update(timeControls,delta);
      const playerShipIcon=shipIdToIcon[playerShip.getShipId()];
      playerShipIcon.x=playerShip.x*2;
      playerShipIcon.y=playerShip.y*2;
      playerShipIcon.rotation=playerShip.rotation;


      timeControls.update(delta);
      planets.forEach(p => p.checkLanding(playerShip,moveCtrlTargetObj));
      
      cpuShips.forEach(ship => {
        ship.update(timeControls,delta)
        const cpuShipIcon=shipIdToIcon[ship.getShipId()];
        cpuShipIcon.x=ship.x*2;
        cpuShipIcon.y=ship.y*2;
        cpuShipIcon.rotation=ship.rotation;
      });
    });

    // const aeonTheme = new GOWN.ThemeParser("../../themes/assets/aeon_desktop/aeon_desktop.json");

  }


}
