import {elMax} from "./util/util";
import {moveToTarget} from "./util/Movement";
import Ship from "./Ship";

const AI_STATES={
  PURCHASE:"purchase",
  SELL:"sell",
};

export default class CPUShip extends Ship {
  constructor(shipId){
    super(shipId);
    this.setPoints([[0,-15],[-10,15],[10,15]]);
    this.setColor(0xDE3249);

    this.aiState=AI_STATES.PURCHASE;
    this.target_planet=null;
  }

  update(timeControls,delta){
    switch (this.aiState) {
      case AI_STATES.PURCHASE:
        if (this.target_planet!=undefined){
          return moveToTarget(timeControls,delta,this,this.target_planet,3);
        }
        break;
      case AI_STATES.SELL:
        break;
      default:
        console.log("Unknown state");
      }
  }

  evalStrategy(planets,globalManager){
    switch (this.aiState) {
      case AI_STATES.PURCHASE:
        const planet=this.findASource(planets,globalManager);
        if (planet!=undefined){
          this.target_planet=planet;
        }
        break;
      case AI_STATES.SELL:
        break;
      default:
        console.log("Unknown state");
    }
  }

  findASource(planets,globalManager){
    const planetNameToValue={};
    const nameToPlanet={};

    planets.forEach((p)=>nameToPlanet[p.name]=p);

    for (let planet of planets){
      const large=planet.objectiveLargeAmount();
      planetNameToValue[planet.getName()]=large.totalValue(globalManager);
    }
    const bestPlanetEntry=elMax(Object.entries(planetNameToValue), (entry) =>{
      const [key,val] = entry;
      return val;
    });
    return nameToPlanet[bestPlanetEntry[0]];
  }

  // findASink(planets,globalManager){
  //
  // }

}
