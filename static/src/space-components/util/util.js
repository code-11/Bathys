export function elMax(arr, func){
  const mirror = arr.map(func);
  const maxI=arr.reduce((acci, cur, i) => mirror[i] > mirror[acci] ? i : acci,0);
  return arr[maxI];
}

export function elMin(arr, func){
  const mirror = arr.map(func);
  const minI=arr.reduce((acci, cur, i) => mirror[i] < mirror[acci] ? i : acci,0);
  return arr[minI];
}

export function camel(str){
  const tempStr1=str.toLowerCase();
  const tempStr2 = tempStr1.substr(0, 1).toUpperCase() + tempStr1.substr(1);
  return tempStr2;
}

export function deeplicate(obj){
  return JSON.parse(JSON.stringify(obj));
}

export function dictGet(object, key, default_value) {
    var result = object[key];
    return (result != undefined) ? result : default_value;
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max-min+1) + min );
}

export function randomChoose(arr){
  return arr[getRandomInt(0,arr.length-1)]
}
