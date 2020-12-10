export default class SpecifiedResourceAssignmentStrategy{
  constructor(planets, ship, resourceManager){
    this.resourceManager=resourceManager;

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

    const p1res= ps.planet1.resourceManager;
    p1res.assignResourceAmount(resm.resources_by_name.durasteel.name,100);
    p1res.assignResourceAmount(resm.resources_by_name.plasglass.name,100);
    p1res.assignResourceAmount(resm.resources_by_name.medicine.name,100);
    p1res.assignResourceAmount(resm.resources_by_name.valves.name,100);

    const p2res= ps.planet2.resourceManager;
    p2res.assignResourceAmount(resm.resources_by_name.food.name,100);
    p2res.assignResourceAmount(resm.resources_by_name.core.name,100);
    p2res.assignResourceAmount(resm.resources_by_name.bodies.name,100);
    p2res.assignResourceAmount(resm.resources_by_name.art.name,100);
  }

  assignResourcesWanted(){
    const resm = this.resourceManager;
    const ps=this.planetsByName;
    this.planets.forEach((planet)=>{
        this.resourceManager.resources.forEach((res)=>{
        planet.resourceManager.amountsWanted[res.name]=50;
      });
    })

    const p1res= ps.planet1.resourceManager;
  }

  assignProduction(){
    const resm = this.resourceManager;
    const ps=this.planetsByName;
    ps.planet1.resourceManager.production=[
      resm.resources_by_name.durasteel,
      resm.resources_by_name.plasglass,
      resm.resources_by_name.medicine,
      resm.resources_by_name.valves,
    ];

    ps.planet2.resourceManager.production=[
      resm.resources_by_name.food,
      resm.resources_by_name.core,
      resm.resources_by_name.bodies,
      resm.resources_by_name.art,
    ];
  }
}
