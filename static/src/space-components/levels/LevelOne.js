import SpecifiedResourceAssignmentStrategy from "../SpecifiedResourceAssignmentStrategy";
import FocusResourceAssignmentStrategy from "../FocusResourceAssignmentStrategy";
import RandomPlanetCreationStrategy from "../RandomPlanetCreationStrategy";

import Level from "./Level";

export default class LevelOne extends Level{

  constructor(){
    super();
  }

  getViewWidth(){
    return 1000;
  }

  getViewHeight(){
    return 1000;
  }

  getLevelWidth(){
    return 1000;
  }

  getLevelHeight(){
    return 1000;
  }

  getStartingLocation(){
    return {px:500,py:500}
  }

  planetInitialization(graphics, viewport, resourceManager, playerShip){
    const planetCreator = new RandomPlanetCreationStrategy(this.app.renderer, graphics, viewport)
    const planets=planetCreator.createPlanets(Object.values(resourceManager.focuses_by_name),Object.values(resourceManager.focuses_by_name).length,this.getLevelWidth(),this.getLevelHeight());

    const resourceAssigner = new FocusResourceAssignmentStrategy(planets, playerShip, resourceManager);
    resourceAssigner.assignProduction();
    resourceAssigner.assignResources();

    return planets;
  }
}
