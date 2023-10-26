/**
 * 节流函数-函数首次会执行一次，每次间隔一样的时间都会执行一次，
 * @param {Function} fn-目标函数
 * @param {Number} wait-设定执行函数的延时时间(ms)
*/

export function throttle(fn: () => void, wait = 50) {
  let entryTime = 0

  return function (...args: any[]) {
    const nowTime = Date.now()

    if (nowTime - entryTime > wait) {
      fn.apply(this, args)

      entryTime = Date.now()
    }
  }
}
