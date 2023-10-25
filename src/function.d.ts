interface Function {
  myCall(this: any, ctx: any, ...args: any[]): any

  myBind(this: any, ctx: any, ...args: any[]): any

  myApply(this: any, ctx: any, args?: any[]): any
}
