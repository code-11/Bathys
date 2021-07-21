import * as PIXI from 'pixi.js';
import ResourceManager from "../ResourceManager";
import PlanetCreationStrategy from "../PlanetCreationStrategy";
import FocusResourceAssignmentStrategy from "../FocusResourceAssignmentStrategy";
import TimeControls from "../gui/TimeControls";
import Planet from "../Planet";
import {deeplicate} from "../util/util";

export default class DevelopmentTest{
    constructor(){
    }

    run(){
      const thePromise = new Promise((resolve, reject) => {

        const fakeShip={
          resourceManager:{
            assignResourceAmount:(name,val)=>{}
          }
        }

        const resourceManager = new ResourceManager();
        resourceManager.initResources();
        resourceManager.initFocuses();
        resourceManager.initResourceGraph();

        const crowdedFocus=resourceManager.focuses_by_name["Crowded"];

        const planetCreationStrat=new PlanetCreationStrategy();

        const planet= new Planet(null);
        planet.name="TestCrowdedPlanet";
        planet.focus = deeplicate(crowdedFocus);
        planet.development = crowdedFocus.avgDev;
        planet.developmentSlots = planetCreationStrat.assignBaseIndustry(planet.focus, planet.development);
        planet.resourceManager.globalResourceManager=resourceManager;

        const developmentHook = planet.createDevelopmentHook();

        const resourceAssigner = new FocusResourceAssignmentStrategy([planet], fakeShip, resourceManager);
        resourceAssigner.assignProduction();
        resourceAssigner.assignResources();
        resourceAssigner.assignResourcesWanted();

        console.log("Before state");
        console.log(planet.resourceManager.resources)
        console.log(planet.development);
        console.log(planet.developmentSlots);

        console.log("Giving enough to level");
        planet.resourceManager=planet.resourceManager.plus(planet.neededForDevelopmentObj());
        console.log(planet.resourceManager.resources);
        developmentHook.callback();

        console.log("After state");
        console.log(planet.resourceManager.resources)
        console.log(planet.development);
        console.log(planet.developmentSlots);

      });
      return thePromise;
    }
}
