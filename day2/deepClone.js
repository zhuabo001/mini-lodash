// 深拷贝
// 1. 基本数据类型直接返回：string, number, boolean, null, undefined, symbol
// 2. 引用数据类型递归处理： object\array
// 3. 特殊对象处理： Date、RegExp、Function、Map、Set等
// 4. 循环引用处理： 使用weakMap避免无限递归
function deepClone(value, cache = new WeakMap()) {
  // 处理基本数据类型 和 函数
  if (value === null || typeof value !== 'object') {
    return value;
  }

  // 处理循环引用
  if (cache.has(value)) {
    return cache.get(value);
  }

  // 处理特殊对象类型
  if (value instanceof Date) {
    return new Date(value);
  }

  if (value instanceof RegExp) {
    return new RegExp(value);
  }

  // map和set中的实现需要询问ai
  if (value instanceof Map) {
    // 先创建新的map并缓存，再填充内容，避免循环引用导致的无限递归
    const clonedMap = new Map();
    cache.set(value, clonedMap); // 加入缓存
    value.forEach((val, key) => {
      clonedMap.set(key, deepClone(val, cache));
    });
    return clonedMap;
  }

  if (value instanceof Set) {
    // 先创建新的set并缓存，再填充内容，避免循环引用导致的无限递归(为什么这样可以避免无限递归？)
    const clonedSet = new Set();
    cache.set(value, clonedSet);
    value.forEach((val) => {
      clonedSet.add(deepClone(val, cache));
    });
    return clonedSet;
  }

  // 处理数组和普通对象
  const cloned = Array.isArray(value) ? [] : {};
  cache.set(value, cloned);

  // 递归拷贝所有属性
  Object.keys(value).forEach((key) => {
    cloned[key] = deepClone(value[key], cache);
  });
  // 处理symbol属性
  Object.getOwnPropertySymbols(value).forEach((symbol) => {
    cloned[symbol] = deepClone(value[symbol], cache);
  });
  return cloned;
}
