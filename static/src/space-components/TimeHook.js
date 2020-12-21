export default class TimeHook{
  constructor(timeUnits,callback){
    this.deltaHourEpoch=this.hourEpoch(timeUnits);
    this.callback=callback;
    this.lastHourEpoch=0;
  }

  hourEpoch(timeUnits){
    const {years=0,months=0,days=0,hours=0} = timeUnits;
    const hourEpoch = hours + 10*days + 100*months + 1000*years;
    return hourEpoch;
  }

  resolve(curHourEpoch){
    const hourEpochDiff = curHourEpoch - this.lastHourEpoch;
    if (hourEpochDiff >=this.deltaHourEpoch){
      this.callback();
      this.lastHourEpoch = curHourEpoch;
    }
  }

}
