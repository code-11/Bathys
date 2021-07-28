import * as PIXI from 'pixi.js'

import {moveToTarget} from "./util/Movement";

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
    moveToTarget(timeControls,delta,this._ctrlObj,this._target,this._epsilon);
  }
}
