import * as PIXI from 'pixi.js'
export default class MouseMovementController{
  constructor(all_landing_checkers){
    this._ctrlObj=null; //PIXI.Graphics
    this._target=null;  //PIXI.Point
    this._targetObj=null;
    // this._speed=2;
    this._epsilon=3;

    this.viewport=null;

    this._all_landing_checkers=all_landing_checkers;
  }

  init(){

    this._parent_graphic.on("click", (evt)=>{
      const global_mouse_pos=this._renderer.plugins.interaction.mouse.global;
      const global_diff= this.viewport.toWorld(0,0);
      const mouse_pos=new PIXI.Point(global_mouse_pos.x+global_diff.x,global_mouse_pos.y+global_diff.y);
      this._target=new PIXI.Point(mouse_pos.x,mouse_pos.y);
      this._targetObj.x=mouse_pos.x;
      this._targetObj.y=mouse_pos.y;
    });
  }

  update(timeControls,delta){
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

        //now that we have things normalized, multiply a bunch of stuff together!
        //The range of this number should be "around" 1-5.
        const mag_speed=(mag/(timeControls.getSpeed()))*delta;

        const x_apply=(x_diff/mag_speed);
        const y_apply=(y_diff/mag_speed);

        this._ctrlObj.x+=x_apply;
        this._ctrlObj.y+=y_apply;
      }
    }
  }
}
