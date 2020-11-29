

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
// Activities:
//
//   Normal:
//     Requires:
//       Passengers
//       Standardized Food
//       Art
//       Durasteel
//       Plasglass
//       Precision Valves
//       Energy
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
//       Nothing
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
//   Plasglass -> Diamond
//   Durasteel + Energy Storage Units -> Weapons
//   Durasteel -> Heavy Machinery
//   Durasteel + CPUs -> Machine bodies

}
