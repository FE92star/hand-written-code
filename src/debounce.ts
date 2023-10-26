/**
 * 防抖函数-函数到设定的延时时间后一定会执行一次
 * 应用场景——用户输入执行搜索函数
 * @param {Function} fn-目标函数
 * @param {Number} delay-设定执行函数的延时时间(ms)
*/

export function debounce(fn: () => void, delay = 50) {
  let timer: NodeJS.Timeout

  return function (...args: any[]) {
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
