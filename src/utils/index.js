/*
 * @Author: zulezhe
 * @Date: 2022-10-20 23:07:58
 * @LastEditors: zulezhe
 * @LastEditTime: 2022-10-23 15:25:20
 * @Path: https://gitee.com/zulezhe/
 * @Description: 
 */
/**
 * 深克隆
 * @param {*} obj 
 * 
 */
export function deepCopy(obj) {
  if (!obj || typeof obj !== "object") return obj;
  var retObj = {};
  for (var attr in obj) {
    var type = obj[attr];

    switch (true) {
      case (type instanceof Date):
        var _d = new Date();
        _d.setDate(type.getDate())
        retObj[attr] = _d;
        break;

      case (type instanceof Function):
        retObj[attr] = obj[attr];
        break;

      case (type instanceof Array):
        var _a = [];
        for (var e of type) {
          //_a.push(e);
          _a.push(deepCopy(e));
        }
        retObj[attr] = _a;
        break;

      case (type instanceof Object):
        var _o = {};
        for (var e in type) {
          //_o[e] = type[e];
          _o[e] = deepCopy(type[e]);
        }
        retObj[attr] = _o;
        break;

      default:
        retObj[attr] = obj[attr];
    }
  }
  return retObj;
}

/**
 * 判读是否是一个对象
 * @param item
 * @returns {boolean}
 */
export function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * 深合并
 * @param target
 * @param ...sources
 */
export function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }
  return mergeDeep(target, ...sources);
}