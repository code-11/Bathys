import FixedSizeButton from "./gui/FixedSizeButton";
import Container from "./gui/Container";
import PopupWindow from "./gui/PopupWindow";

const MAX_WIDTH=4;

const lblTextOptions={
    fontFamily : 'Arial',
    fontSize: 12,
    fill : 0xff1010,
    align : 'center'
  };

//TODO: THIS IS NOT SHOWING UP!

export default class PlayerBuildMenu{
    constructor(planet,renderer,top_graphic){
        this.planet=planet;
        this.renderer = renderer;
        this.top_graphic=top_graphic;
    }

    initBuildMenu(ship){
        const possibleProducts = this.planet.resourceManager.production;
        const containerHeight= possibleProducts==undefined ? 0 : Math.ceil(possibleProducts/4.0);
        const container = new Container(MAX_WIDTH,containerHeight);
        container._padding=3;

        possibleProducts.forEach((res,i)=>{
            const x= i % MAX_WIDTH;
            const y= Math.floor(i / MAX_WIDTH)+1;
            const textToUse = res !=null ? res.name : " ";
            const optionBtn=new FixedSizeButton(textToUse,lblTextOptions,50,50);
            optionBtn._thickness=1;
            optionBtn._border_color=0xff1010;
            optionBtn._padding=2;
            optionBtn.interactive=true;
            optionBtn.buttonMode=true;
            optionBtn.setHitArea();
            optionBtn.on("click", (e)=>{
                console.log(res.name);
            });
            container.addElement(x,y,x,y,optionBtn);
        });

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