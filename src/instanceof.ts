export function myInstanceof(left: any, right: Function): boolean {
  if (!left) return false

  // 原型链递归查询
  return left.__proto__ === right.prototype || myInstanceof(left.__proto__, right)
}
