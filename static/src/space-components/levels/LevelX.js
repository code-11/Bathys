import SpecifiedResourceAssignmentStrategy from "../SpecifiedResourceAssignmentStrategy";
import FocusResourceAssignmentStrategy from "../FocusResourceAssignmentStrategy";
import PlanetCreationStrategy from "../PlanetCreationStrategy";

import Level from "./Level";

export default class LevelX extends Level{

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
    return 5000;
  }

  getLevelHeight(){
    return 5000;
  }

  getStartingLocation(){
    return {px:0,py:0}
  }

  planetInitialization(graphics, viewport, resourceManager, playerShip){
    const planetCreator = new PlanetCreationStrategy(this.app.renderer, graphics, viewport)
    const planets=planetCreator.createPlanets(Object.values(resourceManager.focuses_by_name),Object.values(resourceManager.focuses_by_name).length,this.getLevelWidth(),this.getLevelHeight());

    const resourceAssigner = new FocusResourceAssignmentStrategy(planets, playerShip, resourceManager);
    resourceAssigner.assignProduction();
    resourceAssigner.assignResources();

    return planets;
  }
}
