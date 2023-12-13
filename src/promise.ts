type ResolveFn = (value: any) => void
type RejectFn = (reason: any) => void

enum PromiseState {
  PENDING = 'pending',
  FULLFILED = 'fullfiled',
  REJECTED = 'rejected'
}

export class MyPromise {
  status = PromiseState.PENDING
  value = undefined
  reason = undefined
  onResolveCallbacks: any[] = []
  onRejectCallbacks: any[] = []

  constructor(excutor: (resolve: ResolveFn, reject: RejectFn) => void) {
    const resolveFn = (value: any) => {
      if (this.status === PromiseState.PENDING) {
        this.status = PromiseState.FULLFILED
        this.value = value

        this.onResolveCallbacks.forEach((fn: any) => fn())
      }
    }

    const rejectFn = (reason: any) => {
      if (this.status === PromiseState.PENDING) {
        this.status = PromiseState.REJECTED
        this.reason = reason

        this.onRejectCallbacks.forEach((fn: any) => fn())
      }
    }

    try {
      excutor(resolveFn, rejectFn)
    } catch (error: any) {
      throw new Error(error)
    }
  }

  then(onFulfilled: ResolveFn, onRejected: RejectFn) {
    if (this.status === PromiseState.FULLFILED) {
      onFulfilled(this.value)
    }

    if (this.status === PromiseState.REJECTED) {
      onRejected(this.reason)
    }

    if (this.status === PromiseState.PENDING) {
      this.onResolveCallbacks.push(() => {
        onFulfilled(this.value)
      })

      this.onRejectCallbacks.push(() => {
        onRejected(this.reason)
      })
    }

    return this
  }
}

// @ts-ignore
Promise._all = (iterObj) => {
  // 1. iterObj 必须是一个可迭代对象, 否则, 无法正常进行则抛出错误
  if (!(typeof iterObj === "object" && iterObj !== null && typeof iterObj[Symbol.iterator] === "function")) {
    throw new TypeError(`${iterObj} is not iterable`);
  }
  iterObj = [...iterObj];
  /*
   *  2. 函数返回值为 `<Promise>` 对象, 当参数 `iterObj` 内所有的 `Promise` 成功, 
   *     该 `<Promise>` 对象成功, 成功数据为所有成功的 `Promise` 结果数组,
   *     有一个不成功, 则该 `<Promise>` 不成功, 失败数据为失败原因字符串
   */
  return new Promise((resolve, reject) => {
    const len = iterObj.length;
    let count = 0;
    if (len === 0) return resolve([]);

    const res = new Array(len);
    iterObj.forEach(async (item: any, index: number) => {
      const newItem = Promise.resolve(item);
      try {
        const result = await newItem;
        res[index] = result;
        if (++count === len) {
          resolve(res)
        }
      } catch (err) {
        reject(err);
      }
    })
  })
}

/**
 * @param {Array<Promise>} iterList
*/
// @ts-ignore
Promise._all = (iterList) => {
  // 1. iterObj 必须是一个可迭代对象, 否则, 无法正常进行则抛出错误
  if (!(typeof iterList === "object" && iterList !== null && typeof iterList[Symbol.iterator] === "function")) {
    throw new TypeError(`${iterList} is not iterable`);
  }

  const promiseList = [...iterList]
  const promiseLen = promiseList.length

  return new Promise((resolve, reject) => {
    let count = 0

    promiseList.forEach(async (item, index) => {
      // 传入一个空数组，返回一个空数组
      if (promiseLen === 0) return resolve([])
      // 用于存储promise返回的结果
      const res = new Array(promiseLen)
      // 将参数的对象Promise化
      const newItem = Promise.resolve(item)

      try {
        const result = await newItem
        res[index] = result

        if (++count === promiseLen) {
          resolve(res)
        }
      } catch (error) {
        reject(error)
      }
    })
  })
}

// @ts-ignore
Promise._race = (arr) => {
  return new Promise((resolve, reject) => {
    for (const item of arr) {
      Promise.resolve(item).then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    }
  })
}

// @ts-ignore
Promise._absort = (proIns, timeDelay = 5000) => {
  const rejectPromise = () => new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('超时')
    }, timeDelay)
  })

  return Promise.race([rejectPromise(), proIns])
}

// @ts-ignore
Promise._resolve = (value) => {
  // 1. 如果calue是promise，直接返回即可
  if (value instanceof Promise) return value

  // 2. 如果calue是thenable对象，则包装成promise对象返回
  if (value && value.then && typeof value === 'function') {
    return new Promise((resolve, reject) => {
      value.then(resolve, reject)
    })
  }

  // 3. value是其他值
  return new Promise((resolve, reject) => {
    resolve(value)
  })
}
