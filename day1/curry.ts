function curryAgain(func: Function) {
  // 递归调用， 直到所有参数都被传递  —— 参数收集
  return function curried(...args: any[]) {
    if (
      args.length >=
      func.length /** func.length 函数的length属性用来表示形参的个数， 如果当前接收的参数已经满足数量 就直接执行函数*/
    ) {
      return func.apply(this as unknown, args);
    } else {
        return function (...nextArgs: any[]) {
            return curried.apply(this as unknown, args.concat(nextArgs));ß
        }
    }
  };
}
