import Ship from "./Ship";

export default class PlayerShip extends Ship{
  constructor(){
    super();
    this.setPoints([[0,-15],[-10,15],[10,15]]);
    this.setColor(0xDE3249);
  }
}
