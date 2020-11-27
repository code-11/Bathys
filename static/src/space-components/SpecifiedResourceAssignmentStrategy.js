export default class SpecifiedResourceAssignmentStrategy{
  constructor(planets,resourceManager){
    this.resourceManager=resourceManager;

    this.planets=planets;
    this.planetsByName={};
    this.planets.forEach( p => {
      this.planetsByName[p.name]=p;
      p.resourceManager.globalResourceManager=resourceManager;
    })
  }

  assignResources(){
    const resm = this.resourceManager;
    const ps=this.planetsByName;
    ps.planet1.resourceManager.resources=[
      resm.resources_by_name.durasteel,
      resm.resources_by_name.plasglass,
      resm.resources_by_name.medicine,
      resm.resources_by_name.valves,
    ];

    ps.planet2.resourceManager.resources=[
      resm.resources_by_name.food,
      resm.resources_by_name.core,
      resm.resources_by_name.bodies,
      resm.resources_by_name.art,
    ];
  }
}
