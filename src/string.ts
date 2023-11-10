/**
 * 数字千分位
 * 12345678 ==> 12,345,678
*/

export function toString(num: number): string {
  const numList = `${num}`.split('').reverse()
  const res = []

  for (let i = 0; i < numList.length; i++) {
    if (i && i % 3 === 0) {
      res.push(',')
    }

    res.push(numList[i])
  }

  return res.reverse().join('')
}
