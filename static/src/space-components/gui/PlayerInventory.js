import Container from "./Container";
import Button from "./Button";

export default class PlayerInventory extends Container{
  constructor(globalResourceManager, playerShip){
    const numResources = globalResourceManager.resources.length;
    super(2,numResources);

    this.globalResourceManager=globalResourceManager;
    this.playerShip=playerShip;

    this.initResourceList();
    this.init();
    this.y=100;
    this.drawFunc();
  }

  initResourceList(){
    const allResources=this.globalResourceManager.resources;
    allResources.forEach((res,i)=>{

      const nameLbl = new Button(res.displayName, {
        fontFamily : 'Arial',
        fontSize: 12,
        fill : 0xff1010,
        align : 'center'
      });
      nameLbl._thickness=2;
      nameLbl._border_color=0xff1010;
      nameLbl._padding=5;

      const amount = this.playerShip.resourceManager.getResourceAmount(res.name);
      const amountLbl = new Button(amount.toString(), {
        fontFamily : 'Arial',
        fontSize: 12,
        fill : 0xff1010,
        align : 'center'
      });
      amountLbl._thickness=2;
      amountLbl._border_color=0xff1010;
      amountLbl._padding=5;

      this.addElement(0,i,0,i,nameLbl);
      this.addElement(1,i,1,i,amountLbl);

    })
  }
}
