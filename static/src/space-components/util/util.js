export function dictGet(object, key, default_value) {
    var result = object[key];
    return (result != undefined) ? result : default_value;
}
