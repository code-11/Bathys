export default class FocusResourceAssignmentStrategy{
  constructor(planets, ship, resourceManager){
    this.resourceManager=resourceManager;

    this.ship=ship;
    this.planets=planets;
    this.planetsByName={};
    this.planets.forEach( p => {
      this.planetsByName[p.name]=p;
    });
  }

  assignResources(){
    const resm = this.resourceManager;
    const ps=this.planetsByName;
    const highCost= this.resourceManager.highestCost();

    this.planets.forEach(p=>{
      p.resourceManager.production.forEach((res)=>{
        const initialProducationLevel= Math.floor((highCost*2) / res.intrinsicVal);
        p.resourceManager.assignResourceAmount(res.name,initialProducationLevel);
      });
    });

    this.resourceManager.resources.forEach((res)=>{
      this.ship.resourceManager.assignResourceAmount(res.name,0);
    });

    this.ship.resourceManager.assignResourceAmount(resm.moneyRes.name,120);

  }

  assignFocusedProduction(planet){
    planet.resourceManager.production=planet.focus.produces;
    planet.resourceManager.consumption= planet.focus.requires;
    const seenRes=new Set();
    planet.focus.requires.forEach((res)=>{
      seenRes.add(res.name);
    })
    planet.resourceManager.production.forEach((res)=>{
      const secondaryItems=this.resourceManager.getRequirements(res);
      secondaryItems.forEach((recipe)=>{
        const res2 = recipe.resource;
        if (!seenRes.has(res2.name)){
          planet.resourceManager.secondaryConsumption.push(res2);
          seenRes.add(res2.name);
        }
      });
    });
  }

  assignProduction(){
    const resm = this.resourceManager;
    this.planets.forEach(p=>{
      this.assignFocusedProduction(p);
    });
  }
}
