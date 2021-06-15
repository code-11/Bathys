import Resource from "./Resource";
import Focus from "./Focus";

import {camel} from "./util/util";

export default class ResourceManager {
  constructor(){
    this.resources=null;
    this.resources_by_name={}
    this.focuses_by_name={};
    this.moneyRes = Resource.create("Money", 1, "Can be exchanged for goods and services.");
  }

  initFocuses(){
    const resn=this.resources_by_name;
    const focuses=[
      new Focus("Opulent",[
        resn.art,
        resn.wood,
        resn.latinum
      ],[
        resn.art,
        resn.food,
      ]),
      new Focus("Crowded",[
        resn.food,
        resn.weapons,
        resn.art,
      ],[
        resn.passengers,
        resn.durasteel,
        resn.plasglass,
      ]),
      new Focus("Colony",[
        resn.passengers,
        resn.durasteel,
        resn.plasglass,
        resn.valves
      ],[
        resn.food,
        resn.wood,
        resn.botanicals,
      ]),
      new Focus("Industry",[
        resn.machinery,
        resn.bodies,
        resn.antimatter,
        resn.uranium,
        resn.liquid,
        resn.core
      ],[]),
      new Focus("Research",[
        resn.valves,
        resn.diamond,
        resn.cpus,
      ],[]),
      new Focus("Warfare",[
        resn.weapons,
        resn.bodies,
        resn.medicine,
        resn.food
      ],[
        resn.latinum,
        resn.passengers
      ])
    ];
    focuses.forEach(f=>{
      this.focuses_by_name[camel(f.name)]=f;
    })
  }

  initResources(){

    this.resources=[
        Resource.create("Durasteel",7,
          "Required for most large construction. Ferrous deposits are common throughout the galaxy. Processing is required but can be done at scale."),
        Resource.create("Plasglass",5,
          "Any rocky planet can provide the silicon needed for plasglass and processing just requires heat. Not all planets are rocky however."),
        Resource.create("Diamond",10,
          "Carbon's big brother. Industrial applications abound, so artifical processing replaced naturally occuring deposits before mankind left earth."),
        Resource.create("Latinum",90,
          "Man has always had a fixation with precious metals. Once gold lost its lusture, Latinum filled the void."),
        Resource.create("Hyper Crystals",20,
          "The word hyper was attached to this material for advertising reasons. However, the crystals have proven useful in a variet of high energy applications"),
        Resource.create("Standardized Food",7,
          "Food cubes. Not great tasting, but will store indefinitely, even in vacuum."),
        Resource.create("Luxury Wood",90,
          "Once Mankind left earth, they realized how rare its biome was. To make matters worse, the material properties expected of such wood can only be created from wind agitation. Artificial farming's horrendous cost and natural biomes scarsity has created a product only the wealth can afford."),
        Resource.create("CPUS",70,
          "The clean room environments required for the creation of CPUs became more common once mankind took to the stars, but the fempto scale techniques and machinery still cost a pretty penny."),
        Resource.create("Antimatter",100,
          "Large ships can create this in small quantities, but only if they don't move. Stationary facilities can create it but only the most developed planets have the colliders necessesary. And thats not even considering the horribly expensive active storage costs."),
        Resource.create("Transcendent Medicine",15,
          "Regular medicine takes too long. In their various wars, mankind needed something faster."),
        Resource.create("Uranium",20,
          "Can be found in large deposits on rocky planets, but still requires excavation. Refinement, inheritant volitility and use in energy production add a premium to its cost."),
        Resource.create("Super Compustion Liquid",10,
          "Once the vast deposits of oil on earth were depleted, many activists hoped for conversion to solid state technologies. However, the inheritant energy density of petrochemicals resulted instead in a more powerful version."),
        Resource.create("Stellar Core",50,
          "A sun in a jar! Or at least the materials found in one. You'd think it would be more expensive, but mankind's propensity for natural sunlight has kept it close to available sources."),
        Resource.create("Weapons",35,
          "The ascension of mankind to the vast reaches of space dampened the necessity for violence. However, once initial colonization subsided, competition over resources remained."),
        Resource.create("Heavy Machinery",25,
          "Big and heavy. Its not difficult to create with the right facilities, but getting it to the right location is key. Many planets still require terraforming."),
        Resource.create("Precision Valves",10,
          "Once, these were in short supply. In the harshness of space, a standard design was required. Now, they are created in oceanic quantities and even used as currency on some planets."),
        Resource.create("Botanicals",15,
          "Despite vast amounts of bioengineering, organics remain hard to grow and require specialized facilites and trained personel to care to them."),
        Resource.create("Machine bodies",60,
          "Robotic bodies are expected to be made to a high quality. They require a synthesis of small scale machinery, electronics and infoware knowledge and thus command a high premium above other products."),
        Resource.create("Art",65,
          "Its infinitely broad definition and new focus on exotic materials and techniques have kept art one of the more expensive products traded in the galaxy."),
        Resource.create("Passengers",10,
          "No matter the industry, specialists will always be required precisely were they are not."),
    ];
    this.resources.forEach(res=>{
      this.resources_by_name[res.name]=res;
    });

  }
}
