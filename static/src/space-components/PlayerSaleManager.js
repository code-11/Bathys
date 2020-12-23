import Button from "./gui/Button";
import Slider from "./gui/Slider";
import Container from "./gui/Container";
import DualSlider from "./gui/DualSlider";
import PopupWindow from "./gui/PopupWindow";
import VerticalScrollWindow from "./gui/ScrollWindow";

export default class PlayerSaleManager extends Container{

  constructor(planetResourceManager){
    super();
    this.top_graphic=null;
    this.renderer=null;
    this.planetResourceManager=planetResourceManager;
    /*
    {
      resource_id:{
        "nameLbl":nameLblObj,
        "shipAmountLbl": shipAmountLblObj,
        "priceLbl": priceLblObj,
        "slider": sliderObj,
        "planetAmountLbl":planetAmountLblObj,

      }
    }
    */
    this.tradeMenu={};
  }

  updatePlayerPlanetSide(){
    if (this.ship!=undefined){
      this.linkShip(this.ship,true);
    }
  }

  //TODO: This is really like a refresh/update. Maybe rename.
  linkShip(ship,force=false){
    if (this.ship==undefined || force){
      this.ship=ship
      const globalRes=this.planetResourceManager.globalResourceManager;
      globalRes.resources.forEach((res,i)=>{
        const shipAmount = ship.resourceManager.getResourceAmount(res.name);
        const planetAmount = this.planetResourceManager.getResourceAmount(res.name);
        this.tradeMenu[res.name].shipAmountLbl.rapidTextRefresh(shipAmount.toString());
        this.tradeMenu[res.name].totalLbl.rapidTextRefresh("0");
        this.tradeMenu[res.name].slider.setMinMax(planetAmount,shipAmount);
        this.tradeMenu[res.name].slider.reset();
        this.tradeMenu[res.name].slider.init();
        this.tradeMenu[res.name].slider.drawFunc();
        this.tradeMenu[res.name].planetAmountLbl.rapidTextRefresh(planetAmount.toString());
        ship.resourceManager.updateResourceGui(res.name);
      });
      ship.resourceManager.updateResourceGui(globalRes.moneyRes.name);
    }
  }

  unlinkShip(ship){
    this.ship=null;
  }

  conductTransaction(val,res){
    const amount=Math.floor(val);
    const avgPrice=this.planetResourceManager.avgPrice(res,amount);
    const transactVal=Math.abs(avgPrice)*amount;
    const moneyName= this.planetResourceManager.globalResourceManager.moneyRes.name;
    const availableMoney= this.ship.resourceManager.getResourceAmount(moneyName);

    const newShipMoney = availableMoney+transactVal;
    const newShipAmount= this.ship.resourceManager.getResourceAmount(res.name) - amount;
    const newPlanetAmount= this.planetResourceManager.getResourceAmount(res.name) + amount;
    if(newShipMoney>=0 && newShipAmount>=0 && newPlanetAmount>=0){
      this.planetResourceManager.assignResourceAmount(res.name,newPlanetAmount);
      this.ship.resourceManager.assignResourceAmount(res.name,newShipAmount);
      this.ship.resourceManager.assignResourceAmount(moneyName,newShipMoney);
      console.log("Transaction "+res.name+"- playerAmount: "+newShipAmount+" planetAmount: "+newPlanetAmount+ " playerMoney: "+newShipMoney);
      return true;
    }
    return false;
  }

  initTradeMenu(){
    const resources=this.planetResourceManager.globalResourceManager.resources;
    const container = new Container(7,resources.length);
    // container.x=35;
    // container.y=-25;
    container._border_color=0xAAAAAA;
    container._thickness=1
    container._padding=5;
    // container.visible=false;

    const lblTextOptions={
      fontFamily : 'Arial',
      fontSize: 12,
      fill : 0xff1010,
      align : 'center'
    };

    resources.forEach((res,i)=>{
      const nameLbl = new Button(res.displayName, lblTextOptions);
      nameLbl._thickness=2;
      nameLbl._border_color=0xff1010;
      nameLbl._padding=5;

      const shipAmountLbl = new Button("Ship#", lblTextOptions);
      shipAmountLbl._border_color=0xff1010;
      shipAmountLbl._padding=5;

      const totalLbl = new Button("0", lblTextOptions);
      totalLbl._border_color==0xff1010;
      totalLbl._padding=5;

      const startingPrice=this.planetResourceManager.price(res);
      const priceLbl = new Button(startingPrice.toString(), lblTextOptions);
      priceLbl._border_color=0xff1010;
      priceLbl._padding=5;

      const confirmBtn = new Button("Confirm", lblTextOptions);

      const amount = this.planetResourceManager.getResourceAmount(res.name);

      const slider = new DualSlider(-1,amount);
      slider._renderer=this.renderer;
      slider.sliderTextTransform=(val)=>{
        return Math.abs(Math.floor(val));
      }
      slider.onSlide=(normVal,val)=>{
        const amount=Math.floor(val);
        const avgPrice=this.planetResourceManager.avgPrice(res,amount);
        priceLbl.rapidTextRefresh(Math.abs(Math.round(avgPrice)));
        const totalCost=avgPrice*Math.abs(amount);
        totalLbl.rapidTextRefresh(Math.ceil(totalCost));
        let confirmTxt="";
        if(amount<0){
          confirmTxt="Buy";
        }else if(amount==0){
          confirmTxt="No Sale";
        }else{
          confirmTxt="Sell";
        }
        confirmBtn.rapidTextRefresh(confirmTxt);
      }

      const planetAmountLbl = new Button(amount.toString(), lblTextOptions);
      // planetAmountLbl._thickness=2;
      planetAmountLbl._border_color=0xff1010;
      planetAmountLbl._padding=5;


      // planetAmountLbl._thickness=2;
      confirmBtn._border_color=0xff1010;
      confirmBtn._padding=5;
      confirmBtn._thickness=2;
      confirmBtn.interactive=true;
      confirmBtn.buttonMode=true;
      confirmBtn.on("click",()=>{
        const success=this.conductTransaction(slider.getVal(),res);
        if(success){
          this.linkShip(this.ship,true);
        }
      });
      confirmBtn.setHitArea();

      container.addElement(0,i,0,i,nameLbl);
      container.addElement(1,i,1,i,shipAmountLbl);
      container.addElement(2,i,2,i,totalLbl);
      container.addElement(3,i,3,i,priceLbl);
      container.addElement(4,i,4,i,slider);
      container.addElement(5,i,5,i,planetAmountLbl);
      container.addElement(6,i,6,i,confirmBtn);

      const resObj={nameLbl,shipAmountLbl,totalLbl,priceLbl,slider,planetAmountLbl};
      this.tradeMenu[res.name]=resObj;

    });

    const scrollWindow = new VerticalScrollWindow(container,this.renderer);
    scrollWindow._height=300;
    scrollWindow._thickness=1;
    scrollWindow._border_color=0xFF0000;

    // scrollWindow.init();
    // scrollWindow.drawFunc();

    const popupWindow= new PopupWindow(scrollWindow);
    popupWindow._renderer=this.renderer;
    popupWindow.top_graphic=this.top_graphic;
    popupWindow.onClose=()=>{
      this.container.visible=!this.container.visible;
    }
    popupWindow.init();
    popupWindow.drawFunc();

    this.container=popupWindow;
    return this.container;
  }
}
