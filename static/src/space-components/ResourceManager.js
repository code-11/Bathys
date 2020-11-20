import Resource from "./Resource";

export default class ResourceManager {
  constructor(){
    this.resources=null;
    this.resources_by_name={}
  }

  initResources(){
    const resourceNames=[
        "Durasteel",
        "Plasglass",
        "Diamond",
        "Latinum",
        "Hyper Crystals",
        "Standardized Food",
        "Luxury Wood",
        "CPUS",
        "Antimatter",
        "Transcendent Medicine",
        "Uranium",
        "Super Compustion Liquid",
        "Stellar Core",
        "Weapons",
        "Heavy Machinery",
        "Precision Valves",
        "Botanicals",
        "Machine bodies",
        "Art",
        "Passengers",
    ];
    this.resources = resourceNames.map(name => new Resource(name));
    this.resources.forEach(res=>{
      const nameArr=res.name.toLowerCase().split(" ");
      const nameToUse=nameArr[nameArr.length-1];
      this.resources_by_name[nameToUse]=res;
    });

  }
}
