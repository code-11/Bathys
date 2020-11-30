import Container from "./Container";
import Button from "./Button";

export default class TimeControls extends Container{
  constructor(){
    super(3,3);

    this.possibleSpeeds=[0,2,3,4,5]
    this.speedIndex=0;
    this.startTime=Date.now();
    this.addedTime=0;
  }

  init(){
    this.timeLbl = new Button("TEST", {
      fontFamily : 'Arial',
      fontSize: 20,
      fill : 0xff1010,
      align : 'center'
    });
    this.timeLbl._border_color=0xff1010;
    this.timeLbl._padding=5;

    const slower = new Button("<", {
      fontFamily : 'Arial',
      fontSize: 16,
      fill : 0xff1010,
      align : 'center'
    });
    slower._thickness=1;
    slower._border_color=0xff1010;
    slower._padding=3;
    slower.buttonMode=true;
    slower.interactive=true;
    slower.on("click",(e1)=>{
      this.decreaseSpeed();
      e1.stopPropagation();
    });

    this.speedLbl = new Button("TEST", {
      fontFamily : 'Arial',
      fontSize: 16,
      fill : 0xff1010,
      align : 'center'
    });
    this.speedLbl._border_color=0xff1010;
    this.speedLbl._padding=5;

    const faster = new Button(">", {
      fontFamily : 'Arial',
      fontSize: 16,
      fill : 0xff1010,
      align : 'center'
    });
    faster._thickness=1;
    faster._border_color=0xff1010;
    faster._padding=3;
    faster.buttonMode=true;
    faster.interactive=true;
    faster.on("click",(e1)=>{
      this.increaseSpeed();
      e1.stopPropagation();
    });

    this._border_color=0xAAAAAA;
    this._thickness=1
    this._padding=10;
    this.visible=true;
    this.addElement(0,0,2,0,this.timeLbl);
    this.addElement(0,1,0,1,slower);
    this.addElement(1,1,1,1,this.speedLbl);
    this.addElement(2,1,2,1,faster);
    super.init();
    this.updateSpeedLbl();
    this.updateTimeLbl();
  }

  update(timeDelta){
    this.addedTime+=(timeDelta*this.getSpeed());
    this.updateTimeLbl();
  }

  updateTimeLbl(){
    const years= Math.floor((this.addedTime / 1000000) % 10) + 3005;
    const months = Math.floor((this.addedTime / 100000) % 10);
    const days = Math.floor((this.addedTime / 10000) % 10);
    const hours = Math.floor((this.addedTime / 1000) % 10);
    this.timeLbl.setText(years+"-"+months+"-"+days+" T "+hours);
  }

  updateSpeedLbl(){
    if(this.speedIndex==0){
      this.speedLbl.setText("paused")
    }else{
      //first setting is at 2 so lets correct
      this.speedLbl.setText((this.getSpeed()-1)+"x speed");
    }
  }

  increaseSpeed(){
    if(this.speedIndex!=this.possibleSpeeds.length-1){
      this.speedIndex+=1;
      this.updateSpeedLbl();
    }
  }

  decreaseSpeed(){
    if(this.speedIndex!=0){
      this.speedIndex-=1;
      this.updateSpeedLbl();
    }
  }

  getSpeed(){
    return this.possibleSpeeds[this.speedIndex];
  }
}
