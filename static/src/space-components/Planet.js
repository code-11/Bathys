import * as PIXI from 'pixi.js';

import Button from "./gui/Button";
import Slider from "./gui/Slider";
import Container from "./gui/Container";
import DualSlider from "./gui/DualSlider";
import PopupWindow from "./gui/PopupWindow";
import VerticalScrollWindow from "./gui/ScrollWindow";

import LandingChecker from "./LandingChecker";
import SaleLandingCheckDecorator from "./SaleLandingCheckDecorator";
import InfoLandingCheckDecorator from "./InfoLandingCheckDecorator";
import TimeHook from "./TimeHook";

import PlayerSaleManager from "./PlayerSaleManager";
import PlanetResourceManager from "./PlanetResourceManager";
import PlanetInfoManager from "./PlanetInfoManager";
import AmountResourceManager from "./AmountResourceManager";

import EXObj from "./core/EXObj";
import EXCircleObj from "./core/EXCircleObj"

export default class Planet extends EXObj{
  constructor(renderer){
    super();
    this.base=null;
    this.landingChecker=null
    this.saleIndicator=null;
    this.saleMenu=null;
    this.infoMenu=null;

    this.focus=null;
    this.development=0;

    this.developmentSlots=[];

    this.top_graphic=null;
    this.renderer=renderer;
    this.viewport=null;

    this.resourceManager=new PlanetResourceManager();
    this.saleManager = new PlayerSaleManager(this);
    this.saleManager.renderer=this.renderer;

    this.infoManager = new PlanetInfoManager(this);
  }

  calcAmountsWanted(){
    //TODO:This needs to account for development, prduction needed and energy.

    //development
    return this.neededForDevelopmentObj();
  }

  neededForDevelopmentObj(){
    const neededVector = new AmountResourceManager();
    const highCost= this.resourceManager.globalResourceManager.highestCost();

    const unneededDevMult = (this.development);
    const neededDevMult= (this.development+2) * 2;

    //There is a small amount of other resources required to develop.
    //This is done so that the planet will buy a small amount of things it doesn't really need.
    this.resourceManager.globalResourceManager.resources.forEach((res)=>{
      const numNeeded= Math.floor((highCost * unneededDevMult) / res.intrinsicVal);
      neededVector.assignResourceAmount(res.name, numNeeded);
    });

    //But its mostly the main requirements.
    for (const res of this.focus.requires){
      const amountNeeded= Math.floor((highCost * neededDevMult) / res.intrinsicVal);
      neededVector.assignResourceAmount(res.name, amountNeeded);
    }
    return neededVector;
  }

  //If this function is called, it is assumed that the slots are
  //of the development before ex: 3, while the new development number
  //is already updated ex 2
  upgradeDevelopmentSlots(){

  }

  createDevelopmentHooks(){
    const neededAmount=this.neededForDevelopmentObj();
    return new TimeHook({
      hours:1
    },()=>{
      const result=this.resourceManager.minus(neededAmount);
      if (result.allPositive()){
        //ok all good, assign the results
        this.resourceManager.resources = result.resources;
        this.development +=1;
        this.upgradeDevelopmentSlots();
        this.infoManager.refresh();
      }
    });
  }

  createProductionHooks(){
    const hooks=[];
    this.developmentSlots.forEach((res)=>{
      if (res!=null){
        hooks.push(new TimeHook({
          hours:5
        },()=>{
          const requirement_recipes = this.resourceManager.globalResourceManager.getRequirements(res);
          let hasAllRes=true;
          requirement_recipes.forEach((recipe)=>{
            if (this.resourceManager.getResourceAmount(recipe.resource.name) < recipe.amount){
              hasAllRes=false;
            }
          });
          if (hasAllRes){
            requirement_recipes.forEach((recipe)=>{
              this.resourceManager.decrResourceAmount(recipe.resource.name, recipe.amount);
            });
            this.resourceManager.incrResourceAmount(res.name,10);
            this.saleManager.updatePlayerPlanetSide();
          }
        }));
      }
    });
    return hooks;
  }

  /*In relation to the cost of the most expensive product,
  is there a lot of this resource on this planet?
  For instance, if there is a 1000 cost item A and a 10 cost item B,
  there are many A if there are 3 of them but only many B if there are 300 of them */
  objectiveLargeAmount(){
    const LARGE_AMOUNT_MULTIPLIER =3;
    const globalManager=this.resourceManager.globalResourceManager;
    const highCost = globalManager.highestCost();

    const calcLargeAmount = (highCost,res) => {
      return (Math.floor(highCost / res.intrinsicVal) * LARGE_AMOUNT_MULTIPLIER);
    };

    const largeAmountVector = new AmountResourceManager();
    globalManager.resources.forEach(res=>{
      largeAmountVector.assignResourceAmount(res.name, calcLargeAmount(highCost,res));
    });

    const amountsWanted = this.calcAmountsWanted();

    const totalNeeded = amountsWanted.plus(largeAmountVector);
    const surplus = this.resourceManager.minus(totalNeeded);
    const largeSurplus = surplus.nonZeroRes();
    return largeSurplus;
  }

  setTopGraphic(top_graphic){
    this.top_graphic=top_graphic;
    this.saleManager.top_graphic=this.top_graphic;
    this.infoManager.top_graphic=this.top_graphic;
  }

  checkLanding(ship,moveCtrlTargetObj){
    if(this.landingChecker!=null){
      this.landingChecker.checkLanding(ship,moveCtrlTargetObj);
    }
  }


  resetContainerPos(){
    this.saleMenu.x=35;
    this.saleMenu.y=-25;
  }

  getName(){
    return this.base.name;
  }

  init(){
    const base = new EXCircleObj();
    // base._origin = new PIXI.Point(500,50);
    base._radius=15;
    base.setColor(this.focus.color);
    base.name=this.name;
    base.init();
    base.viewport=this.viewport
    this.base=base;

    this.saleMenu=this.saleManager.initTradeMenu();
    this.infoMenu=this.infoManager.initInfoMenu();

    const saleOptionIndicator = new EXCircleObj();
    saleOptionIndicator.x=20;
    saleOptionIndicator.y=-20;
    saleOptionIndicator._radius=5;
    saleOptionIndicator.setColor(0x0000FF);
    saleOptionIndicator.visible=false;
    saleOptionIndicator.buttonMode = true;
    saleOptionIndicator.interactive = true;
    saleOptionIndicator.on("click",(e)=>{
      this.saleMenu.visible=!this.saleMenu.visible;
      this.resetContainerPos();
      e.stopPropagation();
    });
    saleOptionIndicator.init();
    this.saleIndicator=saleOptionIndicator;

    const infoOptionIndicator = new EXCircleObj();
    infoOptionIndicator.x=-20;
    infoOptionIndicator.y=-20;
    infoOptionIndicator._radius=5;
    infoOptionIndicator.setColor(0x34EBE1);
    infoOptionIndicator.visible=false;
    infoOptionIndicator.buttonMode = true;
    infoOptionIndicator.interactive = true;
    infoOptionIndicator.on("click",(e)=>{
      this.infoMenu.visible=!this.infoMenu.visible;
      console.log(this.developmentSlots);
      this.resetContainerPos();
      e.stopPropagation();
    });
    infoOptionIndicator.init();
    this.saleIndicator=infoOptionIndicator;

    const baseLandingChecker= new LandingChecker();

    const saleLandingChecker= new SaleLandingCheckDecorator(baseLandingChecker);
    saleLandingChecker._checkingIndicator=saleOptionIndicator;
    saleLandingChecker._parent=this;
    saleLandingChecker._container=this.saleMenu;

    const infoLandingChecker= new InfoLandingCheckDecorator(saleLandingChecker);
    infoLandingChecker._checkingIndicator=infoOptionIndicator;
    infoLandingChecker._parent=this;
    infoLandingChecker._container=this.infoMenu;
    this.landingChecker=infoLandingChecker;

    this.addChild(base);
    this.addChild(this.saleMenu);
    this.addChild(this.infoMenu);
    this.addChild(saleOptionIndicator);
    this.addChild(infoOptionIndicator);

  }
}
