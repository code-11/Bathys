import {getRandomInt, randomChoose, deeplicate} from "./util/util";
import Planet from "./Planet";

export default class RandomPlanetCreationStrategy{
  constructor(renderer, graphics, viewport){
    this.renderer=renderer;
    this.graphics = graphics;
    this.viewport = viewport;
  }

  createPlanets(focuses, planetArr){
    const planets=[];
    for (let i=0; i<planetArr.length; i+=1){

      const planetJson=planetArr[i];

      const planet= new Planet(this.renderer);
      planet.viewport=this.viewport;
      planet.setTopGraphic(this.graphics);
      planet.name=planetJson.name;
      // planet.focus=deeplicate(randomChoose(focuses));
      planet.focus = deeplicate(focuses[i]);
      planet.development = this.assignDevelopment(planet.focus);
      planet.developmentSlots = this.assignBaseIndustry(planet.focus, planet.development);
      planet.x=x;
      planet.y=y

      planets.push(planet);
    }
    return planets;
  }

}
