import Ship from "./Ship";
import PlayerResourceManager from "./PlayerResourceManager";

export default class PlayerShip extends Ship{
  constructor(){
    super();
    this.setPoints([[0,-15],[-10,15],[10,15]]);
    this.setColor(0x0099ff);
    this.resourceManager = new PlayerResourceManager();
  }
}
