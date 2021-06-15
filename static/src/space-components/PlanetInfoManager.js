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
    const container = new Container(2,3);
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

    const lbl1 = new Button("Name:", lblTextOptions);
    lbl1._padding=5;

    const lbl2 = new Button(this.parentPlanet.name, lblTextOptions);
    lbl2._padding=5;

    const lbl3 = new Button("Focus:", lblTextOptions);
    lbl3._padding=5;

    const lbl4 = new Button(this.parentPlanet.focus.name, lblTextOptions);
    lbl4._padding=5;

    const lbl5 = new Button("Event:", lblTextOptions);
    lbl5._padding=5;

    const lbl6 = new Button("None", lblTextOptions);
    lbl6._padding=5;

    container.addElement(0,0,0,0,lbl1);
    container.addElement(1,0,1,0,lbl2);
    container.addElement(0,1,0,1,lbl3);
    container.addElement(1,1,1,1,lbl4);
    container.addElement(0,2,0,2,lbl5);
    container.addElement(1,2,1,2,lbl6);

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
