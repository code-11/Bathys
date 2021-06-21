export default class FocusResourceAssignmentStrategy{
  constructor(planets, ship, resourceManager){
    this.resourceManager=resourceManager;

    this.ship=ship;
    this.planets=planets;
    this.planetsByName={};
    this.planets.forEach( p => {
      this.planetsByName[p.name]=p;
      p.resourceManager.globalResourceManager=resourceManager;
    });
    ship.resourceManager.globalResourceManager=resourceManager;
  }

  assignResources(){
    const resm = this.resourceManager;
    const ps=this.planetsByName;

    this.planets.forEach(p=>{
      p.resourceManager.production.forEach((res)=>{
        p.resourceManager.assignResourceAmount(res.name,10);
      });
    });

    this.resourceManager.resources.forEach((res)=>{
      this.ship.resourceManager.assignResourceAmount(res.name,0);
    });

    this.ship.resourceManager.assignResourceAmount(resm.moneyRes.name,120);

  }

  assignResourcesWanted(){
    const resm = this.resourceManager;
    const ps=this.planetsByName;
    this.planets.forEach((planet)=>{
        this.resourceManager.resources.forEach((res)=>{
        planet.resourceManager.amountsWanted[res.name]=50;
      });
    })

  }

  assignFocusedProduction(planet){
    planet.resourceManager.production=planet.focus.produces;
    planet.resourceManager.consumption= planet.focus.requires;
    planet.resourceManager.production.forEach((res)=>{
      const secondaryItems=this.resourceManager.getRequirements(res);
      planet.resourceManager.secondaryConsumption=planet.resourceManager.secondaryConsumption.concat(secondaryItems);
    });
  }

  assignProduction(){
    const resm = this.resourceManager;
    this.planets.forEach(p=>{
      this.assignFocusedProduction(p);
    });
    // ps.planet1.resourceManager.production=[
    //   resm.resources_by_name.durasteel,
    //   resm.resources_by_name.plasglass,
    //   resm.resources_by_name.medicine,
    //   resm.resources_by_name.valves,
    // ];
    //
    // ps.planet2.resourceManager.production=[
    //   resm.resources_by_name.food,
    //   resm.resources_by_name.core,
    //   resm.resources_by_name.bodies,
    //   resm.resources_by_name.art,
    // ];
  }
}
