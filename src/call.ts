Function.prototype.myCall = function (this: any, ctx: any, ...args: any[]) {
  // 1. 如果不是对象，则new一个新对象
  if (typeof ctx !== 'object') ctx = new Object(ctx)

  const fnKey = Symbol()
  // 2. this赋值给绑定的对象
  ctx[fnKey] = this
  // 3. 执行函数
  const result = ctx[fnKey](...args)
  // 4. 删除key
  delete ctx[fnKey]
  // 5. 返回执行结果
  return result
}

Function.prototype.myBind = function (this: any, ctx: any, ...args: any[]) {
  // 1. 如果不是对象，则new一个新对象
  if (typeof ctx !== 'object') ctx = new Object(ctx)
  const _this = this

  return function (...newArgs: any[]) {
    const fnKey = Symbol()
    // 2. this赋值给绑定的对象
    ctx[fnKey] = _this
    // 3. 执行函数
    const result = ctx[fnKey](...args, ...newArgs)
    // 4. 删除key
    delete ctx[fnKey]
    // 5. 返回执行结果
    return result
  }
}

Function.prototype.myApply = function (this: any, ctx: any, args?: any[]) {
  // 1. 如果不是对象，则new一个新对象
  if (typeof ctx !== 'object') ctx = new Object(ctx)

  const fnKey = Symbol()
  // 2. this赋值给绑定的对象
  ctx[fnKey] = this
  // 3. 执行函数
  const result = Array.isArray(args) ? ctx[fnKey](...args) : ctx[fnKey]()
  // 4. 删除key
  delete ctx[fnKey]
  // 5. 返回执行结果
  return result
}
