import Button from "./gui/Button";
import FixedSizeButton from "./gui/FixedSizeButton";
import Slider from "./gui/Slider";
import Container from "./gui/Container";
import DualSlider from "./gui/DualSlider";
import PopupWindow from "./gui/PopupWindow";
import VerticalScrollWindow from "./gui/ScrollWindow";

export default class PlanetInfoManager{

  constructor(parentPlanet){
    this.top_graphic=null;
    this.parentPlanet=parentPlanet;
  }

  initInfoMenu(){
    const container = new Container(1,4);
    container._border_color=0xAAAAAA;
    container._thickness=1
    container._padding=1;

    container.addElement(0,0,0,0,this.topInfoMenu());
    container.addElement(0,1,0,1,this.productionVisual());
    container.addElement(0,2,0,2,this.developmentSlots());
    container.addElement(0,3,0,3,this.consumptionVisual());

    const popupWindow= new PopupWindow(container);
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

  consumptionVisual(){
    const sectionHeader = new Button("Consumption", {
      fontFamily : 'Arial',
      fontSize: 18,
      fill : 0xff1010,
      align : 'center'
    });

    const lblTextOptions={
      fontFamily : 'Arial',
      fontSize: 12,
      fill : 0xff1010,
      align : 'center'
    };

    const builtInConsume=this.parentPlanet.resourceManager.consumption;
    const secondaryConsume= this.parentPlanet.resourceManager.secondaryConsumption;
    const gridSize = Math.ceil(Math.sqrt(builtInConsume.length + secondaryConsume.length));
    const container = new Container(gridSize,gridSize+1);

    container.addElement(0,0,gridSize,0,sectionHeader);

    builtInConsume.forEach((res,i)=>{
      const x= i % gridSize;
      const y= Math.floor(i / gridSize)+1;
      const slotLbl=new Button(res.name,lblTextOptions);
      slotLbl._padding=2;
      container.addElement(x,y,x,y,slotLbl);
    });

    const builtInLen= builtInConsume.length;

    secondaryConsume.forEach((res,i)=>{
      const x= (i+builtInLen) % gridSize;
      const y= Math.floor((i+builtInLen) / gridSize)+1;
      const slotLbl=new Button(res.name,{fill:0x888888,...lblTextOptions});
      slotLbl._padding=2;
      container.addElement(x,y,x,y,slotLbl);
    });
    container._padding=3;

    return container;
  }

  productionVisual(){
    const products=this.parentPlanet.resourceManager.production;
    const container = new Container(2,products.length);
    container._padding=3;

    const lblTextOptions={
      fontFamily : 'Arial',
      fontSize: 12,
      fill : 0xff1010,
      align : 'center'
    };

    const sectionHeader = new Button("Production", {
      fontFamily : 'Arial',
      fontSize: 18,
      fill : 0xff1010,
      align : 'center'
    });
    container.addElement(0,0,products.length,0,sectionHeader);

    products.forEach((res,i)=>{
      const slotLbl=new Button(res.name,lblTextOptions);
      slotLbl._border_color=0xff1010;
      slotLbl._padding=2;
      container.addElement(i,1,i,1,slotLbl);
    });

    return container;
  }

  developmentSlots(){
    const lblTextOptions={
      fontFamily : 'Arial',
      fontSize: 12,
      fill : 0xff1010,
      align : 'center'
    };

    const slots=this.parentPlanet.developmentSlots;
    const gridSize = Math.ceil(Math.sqrt(slots.length));
    const container = new Container(gridSize,gridSize+1);
    container._padding=3;

    const sectionHeader = new Button("Development Slots", {
      fontFamily : 'Arial',
      fontSize: 18,
      fill : 0xff1010,
      align : 'center'
    });
    container.addElement(0,0,gridSize,0,sectionHeader);

    slots.forEach((slot,i)=>{
      const x= i % gridSize;
      const y= Math.floor(i / gridSize)+1;
      const textToUse = slot !=null ? slot.name : " ";
      const slotLbl=new FixedSizeButton(textToUse,lblTextOptions,50,50);
      const thicknessToUse= slot!=null ? 2 :1;
      slotLbl._thickness=thicknessToUse;
      slotLbl._border_color=0xff1010;
      slotLbl._padding=2;
      container.addElement(x,y,x,y,slotLbl);
    });
    return container;
  }

  topInfoMenu(){
    const container = new Container(2,4);
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

    const nameLbl = new Button("Name:", lblTextOptions);
    nameLbl._padding=5;

    const nameValLbl = new Button(this.parentPlanet.name, lblTextOptions);
    nameValLbl._padding=5;

    const focusLbl = new Button("Focus:", lblTextOptions);
    focusLbl._padding=5;

    const focusValLbl = new Button(this.parentPlanet.focus.name, lblTextOptions);
    focusValLbl._padding=5;

    const devLbl = new Button("Development:", lblTextOptions);
    devLbl._padding=5;

    const devValLbl = new Button(this.parentPlanet.development,lblTextOptions);
    devValLbl._padding=5;

    const eventLbl = new Button("Event:", lblTextOptions);
    eventLbl._padding=5;

    const eventValLbl = new Button("None", lblTextOptions);
    eventValLbl._padding=5;

    container.addElement(0,0,0,0,nameLbl);
    container.addElement(1,0,1,0,nameValLbl);
    container.addElement(0,1,0,1,focusLbl);
    container.addElement(1,1,1,1,focusValLbl);
    container.addElement(0,2,0,2,devLbl);
    container.addElement(1,2,1,2,devValLbl);
    container.addElement(0,3,0,3,eventLbl);
    container.addElement(1,3,1,3,eventValLbl);

    return container;
  }
}
