export class PromiseScheduler {
  /** 最大并发数 */
  max = 0
  /** 当前队列中的任务数 */
  counts = 0
  /** 任务队列 */
  queue: any[] = []

  constructor(max: number) {
    this.max = max
  }

  async add(fn: () => Promise<any>) {
    if (this.counts >= this.max) {
      await new Promise((resolve) => this.queue.push(resolve))
    }

    this.counts++

    const res = await fn()
    this.counts--
    this.queue.length && this.queue.shift()()

    return res
  }
}
