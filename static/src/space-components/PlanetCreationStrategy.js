import {getRandomInt, randomChoose, deeplicate} from "./util/util";
import Planet from "./Planet";

export default class PlanetCreationStrategy{
  constructor(renderer, graphics, viewport){
    this.renderer=renderer;
    this.graphics = graphics;
    this.viewport = viewport;
  }

  assignDevelopment(focus){
    const num=getRandomInt(focus.avgDev-1,focus.avgDev+1);
    const rectifiedNum = Math.max(Math.min(5,num),0);
    return rectifiedNum;
  }

  assignBaseIndustry(focus, development){
    const developmentSlots=new Array(development * development + 5).fill(null);
    focus.produces.forEach((res,i)=>{
      if (developmentSlots.length-1 >= i){
        developmentSlots[i]=res;
      }
    });
    return developmentSlots;
  }

  createPlanets(focuses, num, maxX, maxY){
    const planets=[];
    for (let i=0; i<num; i+=1){
      const x = getRandomInt(0,maxX);
      const y = getRandomInt(0,maxY);

      const planet= new Planet(this.renderer);
      planet.viewport=this.viewport;
      planet.setTopGraphic(this.graphics);
      planet.name="planet"+i;
      planet.focus=deeplicate(randomChoose(focuses));
      planet.development = this.assignDevelopment(planet.focus);
      planet.developmentSlots = this.assignBaseIndustry(planet.focus, planet.development);
      planet.x=x;
      planet.y=y

      planets.push(planet);
    }
    return planets;
  }
}