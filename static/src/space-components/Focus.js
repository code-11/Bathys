export default class Focus {
  constructor(name, requiresResources, producesResources, avgDev, color){
      this.name=name;
      this.requires=requiresResources; //[resObj...]
      this.produces=producesResources; //[resObj...]
      this.avgDev=avgDev;
      this.color = color;
  }
}
