export function moveToTarget(timeControls,delta,ctrlObject,target,epsilon){
  if(ctrlObject!=undefined && target!=undefined){
    const ctrl_x=ctrlObject.x;
    const ctrl_y=ctrlObject.y;

    const target_x = target.x;
    const target_y = target.y;

    const x_diff=target_x-ctrl_x;
    const y_diff=target_y-ctrl_y;

    const mag=Math.sqrt(Math.pow(x_diff, 2)+Math.pow(y_diff, 2));

    if(mag>epsilon){
      ctrlObject.rotation = Math.PI/2+Math.atan2(y_diff,x_diff);

      //now that we have things normalized, multiply a bunch of stuff together!
      //The range of this number should be "around" 1-5.
      const mag_speed=(mag/(timeControls.getSpeed()))*delta;

      const x_apply=(x_diff/mag_speed);
      const y_apply=(y_diff/mag_speed);

      ctrlObject.x+=x_apply;
      ctrlObject.y+=y_apply;
    }
  }
}
