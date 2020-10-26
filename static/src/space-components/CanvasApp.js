import React, { Component } from "react";

//https://two.js.org/#introduction

export default class App extends Component {
  constructor(props) {
    super(props);
    this.shipX=100;
    this.shipY=100;

  };

  clearShip(context){
    context.clearRect(this.shipX-10, this.shipY-10, 20, 20);
    context.fillStyle = "black";
    // context.fillRect(this.shipX-10, this.shipY-10, 20, 20);
  }

  drawShip(context){
    context.beginPath();
    context.moveTo(this.shipX, this.shipY);
    context.moveTo(this.shipX-10, this.shipY+10);
    context.lineTo(this.shipX+10, this.shipY+10);
    context.lineTo(this.shipX, this.shipY-10);
    context.lineTo(this.shipX-10, this.shipY+10);
    context.closePath();

    // the outline
    context.lineWidth = 2;
    context.strokeStyle = '#666666';
    context.stroke();

    // the fill color
    context.fillStyle = "#FFCC00";
    context.fill();
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    
    this.drawShip(ctx);

    ctx.globalCompositeOperation = 'destination-over'
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let self=this;
    const moveSpeed=10;
    document.onkeypress = function (e) {
      e = e || window.event;
      if(e.key == "s"){
        self.shipY+=moveSpeed;    
      }
      if(e.key == "w"){
        self.shipY-=moveSpeed;
      }
      if(e.key == "a"){
        self.shipX-=moveSpeed;    
      }
      if(e.key == "d"){
        self.shipX+=moveSpeed;
      }
      self.clearShip(ctx);
      self.drawShip(ctx);
    };
  }

  render() {
    return (
      <div>
        <canvas ref="canvas" width={640} height={425} />
      </div>
      )
  }
}
