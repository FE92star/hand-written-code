/**
 * 实现一个new函数（用于实例化一个构造函数）
 * @param {Class} cls-构造函数
 * @param {Array} args-剩余参数
 * 1. 创建一个新对象，它继承构造函数的原型
 * 2. 执行构造函数，将this指向到新对象上
 * 3. 如果执行的结果是一个对象，返回执行结果，否则返回新对象
 */

export function myNew(cls: Function, ...args: any[]) {
  const newObj = Object.create(cls.prototype)
  const res = cls.apply(newObj, args)

  return typeof res === 'object' ? res : newObj
}
