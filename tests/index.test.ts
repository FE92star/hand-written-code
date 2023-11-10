import { expect, test } from 'vitest'
import { myNew, MyPromise, myInstanceof, transformTree2List, transformList2Tree, type TreeNode, type ListNode, toString } from '../src'
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

const treeData: TreeNode[] = [
  {
    title: 'parent 1',
    id: '0-0',
    pid: '0',
    children: [
      {
        title: 'parent 1-0',
        id: '0-0-0',
        pid: '0-0',
        children: [
          {
            title: 'leaf',
            id: '0-0-0-0',
            pid: '0-0-0'
          },
          {
            title: 'leaf',
            id: '0-0-0-1',
            pid: '0-0-0'
          },
        ],
      },
      {
        title: 'parent 1-1',
        id: '0-0-1',
        pid: '0-0',
      },
    ],
  },
]

const listData: ListNode[] = [
  {
    "id": "0-0",
    "pid": "0",
    "title": "parent 1",
  },
  {
    "id": "0-0-0",
    "pid": "0-0",
    "title": "parent 1-0",
  },
  {
    "id": "0-0-0-0",
    "pid": "0-0-0",
    "title": "leaf",
  },
  {
    "id": "0-0-0-1",
    "pid": "0-0-0",
    "title": "leaf",
  },
  {
    "id": "0-0-1",
    "pid": "0-0",
    "title": "parent 1-1",
  },
]

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

test('tree', () => {
  expect(transformTree2List(treeData)).toMatchSnapshot()

  expect(transformList2Tree(listData)).toMatchSnapshot()
})

test('number', () => {
  expect(toString(12345678)).toBe('12,345,678')
})
