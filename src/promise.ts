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
  }
}
