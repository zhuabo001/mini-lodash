// 函数柯里化
function curry(func) {
  return function curried(...args) {
    if (
      args.length /** 目前已收集的参数个数 */ >=
      func.length /** 获取原函数期望的参数个数 */
    ) {
      // In JavaScript, every function has a length property that indicates the number of parameters the function expects (its arity)
      return func.apply(this, args); // 参数足够，直接执行原函数即可
    } else {
      // 参数不够的话就需要返回一个新函数继续收集参数
      return function (...nextArgs) {
        return curried.apply(this, args.concat(nextArgs) /**新旧参数要合并 */);
      };
    }
  };
}

function add(a, b, c) {
  return a + b + c;
}
let curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3));
console.log(curriedAdd(1, 2)(3));
console.log(curriedAdd(1, 2, 3));
