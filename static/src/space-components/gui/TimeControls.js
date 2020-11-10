import Container from "./Container";
import Button from "./Button";

export default class TimeControls extends Container{
  constructor(){
    super(3,3);

    const time = new Button("TEST", {
      fontFamily : 'Arial',
      fontSize: 20,
      fill : 0xff1010,
      align : 'center'
    });
    time._thickness=2;
    time._border_color=0xff1010;
    time._padding=5;

    const slower = new Button("<", {
      fontFamily : 'Arial',
      fontSize: 16,
      fill : 0xff1010,
      align : 'center'
    });
    slower._thickness=2;
    slower._border_color=0xff1010;
    slower._padding=3;

    const speed = new Button("TEST", {
      fontFamily : 'Arial',
      fontSize: 16,
      fill : 0xff1010,
      align : 'center'
    });
    speed._thickness=2;
    speed._border_color=0xff1010;
    speed._padding=5;

    const faster = new Button(">", {
      fontFamily : 'Arial',
      fontSize: 16,
      fill : 0xff1010,
      align : 'center'
    });
    faster._thickness=2;
    faster._border_color=0xff1010;
    faster._padding=3;

    this._border_color=0xAAAAAA;
    this._thickness=1
    this._padding=10;
    this.visible=true;
    this.addElement(0,0,2,0,time);
    this.addElement(0,1,0,1,slower);
    this.addElement(1,1,1,1,speed);
    this.addElement(2,1,2,1,faster);
    this.init();
    this.drawFunc();
  }
}
