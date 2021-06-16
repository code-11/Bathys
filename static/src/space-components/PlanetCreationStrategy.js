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
      planet.x=x;
      planet.y=y

      planets.push(planet);
    }
    return planets;
  }
}
