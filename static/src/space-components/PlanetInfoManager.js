import Button from "./gui/Button";
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
}
