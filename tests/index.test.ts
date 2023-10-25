import { expect, test } from 'vitest'
import { myNew, MyPromise, myInstanceof } from '../src'
import '../src/call'

function Person(this: any, name: string, age: number) {
  this.name = name
  this.age = age
}

Person.prototype.say = function () {
  return {
    name: this.name,
    age: this.age,
  }
}

const promiseFn = () => {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve('success')
    }, 1000)
  })
}

function getName(this: any) {
  console.log(this.name)
  return this.name
}

const obj = {
  name: 'Bob'
}

test('new and instanceof', () => {
  const person = myNew(Person, 'Bob', 31)

  expect(person.say()).toStrictEqual({ name: 'Bob', age: 31 })

  expect(myInstanceof(person, Person)).toBeTruthy()
})

test('async', async () => {
  const data = await promiseFn()

  expect(data).toBe('success')

  expect(getName.myCall(obj)).toBe('Bob')

  expect(getName.myApply(obj)).toBe('Bob')

  expect(getName.myBind(obj)()).toBe('Bob')
})
