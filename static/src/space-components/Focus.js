export default class Focus {
  constructor(name, requiresResources, producesResources, avgDev, color){
      this.name=name;
      this.requires=requiresResources;
      this.produces=producesResources;
      this.avgDev=avgDev;
      this.color = color;
  }
}
