

export default class Resource{
  constructor(name,displayName,intrinsicVal,desc){
    this.name=name;
    this.displayName=displayName;
    this.intrinsicVal=intrinsicVal;
    this.desc=desc;
  }

  //Creates a Resource from a display name and other parameters.
  static create(displayName, intrinsicVal,desc){
    const nameArr=displayName.toLowerCase().split(" ");
    const nameToUse=nameArr[nameArr.length-1];
    return new Resource (nameToUse,displayName,intrinsicVal,desc);
  }

//10 primary
//6 secondary
//2 tertiary
//2 quatranary


//   20
//   One tertiary
//   5 secondary
//
//   Possible Resources:
//   Durasteel
//   Plasglass
//   Diamond
//   Latinum
//   Hyper Crystals
//   Standardized Food
//   Luxury Wood
//   CPUS
//   Antimatter
//   Transcendent Medicine
//   Uranium
//   Super Compustion Liquid
//   Stellar Core
//   Weapons
//   Heavy Machinery
//   Precision Valves
//   Botanicals
//   Machine bodies
//   Art
//   Passengers
//
//

//Building materials:
//   durasteel
//   Plasglass
//   Valves

// Luxury:
//   wood
//   Art
//   Latinum

// Energy:
//   Antimatter
//   Uranium
//   super combustion Liquid
//   stellar core

// Activities:
//
//   Opulent:
  // Requires:
  //   Art
  //   Luxury wood
  //   Latinum

//   Normal:
//     Requires:
//       Passengers
//       Standardized Food
//       Art
//       Durasteel
//       Plasglass
//       Precision Valves
//       Energy
//     Produces:
//       Passengers
//       Energy
//       Standardized Food
//       Plasglass
//
//   Heavy Industry:
//     Requires:
//       Heavy Machinery
//       Machine bodies
//       Energy+
//     Produces (One of)
//       Durasteel
//       Botanicals
//       Super Compustion Liquid
//       Weapons
//
//   Research
//     Requires:
//       Precision Valves
//       Diamond
//       CPUS
//     Produces (Possible many of)
//       Stellar core
//       Antimatter
//
//   Art
//     Requires:
//       Anything, the more expensive the better
//     Produces:
//       Art
//
//   Warfare/Piracy
//     Requires:
//       Weapons
//       Machine bodies
//       Heavy Machinery
//       Standardized Food
//     Produces:
//       Latinum
//
//
//
//
// Intrinsic Value:
//   Antimatter
//   Luxury Wood
//   CPUS
//   Machine bodies
//   Latinum
//   Art
//
// Recipes:
//   Plasglass -> Diamond -> Hyper crystals
//   Durasteel + Energy Storage Units -> Weapons
//   Durasteel -> Heavy Machinery
//   Durasteel + CPUs -> Machine bodies
//   Botanicals -> Super combustion liquid
//   Botanicals -> Medicine

}
