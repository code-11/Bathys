import Container from "./Container";
import Button from "./Button";

export default class PlayerInventory extends Container{
  constructor(globalResourceManager, playerShip){
    const numResources = globalResourceManager.resources.length;
    super(4,numResources+1);

    this.globalResourceManager=globalResourceManager;
    this.playerShip=playerShip;
  }

  init(){
    this.initResourceList();
    super.init();
  }

  initResourceList(){
    const allResources=this.globalResourceManager.resources;
    const moneyAndAllResources=[this.globalResourceManager.moneyRes].concat(allResources);
    moneyAndAllResources.forEach((res,i)=>{

      const fontOptions={
        fontFamily : 'Arial',
        fontSize: 12,
        fill : 0xff1010,
        align : 'center'
      };

      const nameLbl = new Button(res.displayName,fontOptions );
      // nameLbl._thickness=2;
      nameLbl._border_color=0xff1010;
      nameLbl._padding=5;

      const amount = this.playerShip.resourceManager.getResourceAmount(res.name);
      const amountLbl = new Button(amount.toString(), fontOptions);
      // amountLbl._thickness=2;
      amountLbl._border_color=0xff1010;
      amountLbl._padding=5;

      const downLbl = new Button("<", fontOptions);
      // amountLbl._thickness=2;
      downLbl._border_color=0xff1010;
      downLbl._padding=5;
      downLbl.interactive=true;
      downLbl.buttonMode=true;
      downLbl.on("click",()=>{
        this.playerShip.resourceManager.decrResourceAmount(res.name,5);
        const amount = this.playerShip.resourceManager.getResourceAmount(res.name);
        amountLbl.rapidTextRefresh(amount);
      });

      const upLbl = new Button(">", fontOptions);
      // amountLbl._thickness=2;
      upLbl._border_color=0xff1010;
      upLbl._padding=5;
      upLbl.interactive=true;
      upLbl.buttonMode=true;
      upLbl.on("click",()=>{
        this.playerShip.resourceManager.incrResourceAmount(res.name,5);
        const amount = this.playerShip.resourceManager.getResourceAmount(res.name);
        amountLbl.rapidTextRefresh(amount);
      });

      this.addElement(0,i,0,i,nameLbl);
      this.addElement(1,i,1,i,amountLbl);
      this.addElement(2,i,2,i,downLbl);
      this.addElement(3,i,3,i,upLbl);

    })
  }
}
