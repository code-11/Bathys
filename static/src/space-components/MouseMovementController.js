import * as PIXI from 'pixi.js'
export default class MouseMovementController{
  constructor(){
    this._ctrlObj=null; //PIXI.Graphics
    this._target=null;  //PIXI.Point
    this._targetObj=null;
    this._speed=2;
    this._epsilon=2;
  }

  init(){
    this._renderer.plugins.interaction.on("mousedown", event => {
      const mouse_pos=this._renderer.plugins.interaction.mouse.global;
      this._target=new PIXI.Point(mouse_pos.x,mouse_pos.y);
      this._targetObj.x=mouse_pos.x;
      this._targetObj.y=mouse_pos.y;
    });
  }

  update(){
    if(this._ctrlObj!=undefined && this._target!=undefined){
      const ctrl_x=this._ctrlObj.x;
      const ctrl_y=this._ctrlObj.y;

      const target_x = this._target.x;
      const target_y = this._target.y;

      const x_diff=target_x-ctrl_x;
      const y_diff=target_y-ctrl_y;

      const mag=Math.sqrt(Math.pow(x_diff, 2)+Math.pow(y_diff, 2));

      if(mag>this._epsilon){
        this._ctrlObj.rotation = Math.PI/2+Math.atan2(y_diff,x_diff);

        const mag_speed=mag/this._speed;

        const x_apply=(x_diff/mag_speed);
        const y_apply=(y_diff/mag_speed);

        this._ctrlObj.x+=x_apply;
        this._ctrlObj.y+=y_apply;
      }
    }
  }
}
