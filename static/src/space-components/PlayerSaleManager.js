import Button from "./gui/Button";
import Slider from "./gui/Slider";
import Container from "./gui/Container";
import DualSlider from "./gui/DualSlider";
import PopupWindow from "./gui/PopupWindow";
import VerticalScrollWindow from "./gui/ScrollWindow";

export default class PlayerSaleManager extends Container{

  constructor(planetResourceManger){
    super();
    this.top_graphic=null;
    this.renderer=null;
    this.planetResourceManger=planetResourceManger;
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

  linkShip(ship){
    if (this.ship==undefined){
      this.ship=ship
      const resources=this.planetResourceManger.globalResourceManager.resources;
      resources.forEach((res,i)=>{
        const shipAmount = ship.resourceManager.getResourceAmount(res.name);
        const planetAmount = this.planetResourceManger.getResourceAmount(res.name);
        this.tradeMenu[res.name].shipAmountLbl.rapidTextRefresh(shipAmount.toString());
        this.tradeMenu[res.name].slider.setMinMax(planetAmount,shipAmount);
        this.tradeMenu[res.name].slider.init();
        this.tradeMenu[res.name].slider.drawFunc();
      });
    }
  }

  unlinkShip(ship){
    this.ship=null;
  }

  initTradeMenu(){
    const resources=this.planetResourceManger.globalResourceManager.resources;
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

      const startingPrice=this.planetResourceManger.price(res);
      const priceLbl = new Button(startingPrice.toString(), lblTextOptions);
      priceLbl._border_color=0xff1010;
      priceLbl._padding=5;

      const amount = this.planetResourceManger.getResourceAmount(res.name);

      const slider = new DualSlider(-1,amount);
      slider._renderer=this.renderer;
      slider.onSlide=(normVal,val)=>{
        const avgPrice=this.planetResourceManger.avgPrice(res,Math.floor(val));
        priceLbl.rapidTextRefresh(Math.round(avgPrice));
        const totalCost=avgPrice*Math.floor(val);
        totalLbl.rapidTextRefresh(Math.ceil(totalCost));
      }

      const planetAmountLbl = new Button(amount.toString(), lblTextOptions);
      // planetAmountLbl._thickness=2;
      planetAmountLbl._border_color=0xff1010;
      planetAmountLbl._padding=5;

      const confirmBtn = new Button("Confirm", lblTextOptions);
      // planetAmountLbl._thickness=2;
      confirmBtn._border_color=0xff1010;
      confirmBtn._padding=5;
      confirmBtn._thickness=2;
      confirmBtn.interactive=true;
      confirmBtn.buttonMode=true;
      confirmBtn.setHitArea();

      container.addElement(0,i,0,i,nameLbl);
      container.addElement(1,i,1,i,shipAmountLbl);
      container.addElement(2,i,2,i,totalLbl);
      container.addElement(3,i,3,i,priceLbl);
      container.addElement(4,i,4,i,slider);
      container.addElement(5,i,5,i,planetAmountLbl);
      container.addElement(6,i,6,i,confirmBtn);

      const resObj={nameLbl,shipAmountLbl,priceLbl,slider,planetAmountLbl};
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
