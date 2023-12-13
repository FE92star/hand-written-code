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

// 驼峰转-
// str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(); // helloWorld => hello-world

/**
 * -转驼峰
 *  str.replace(/-([a-z])/g, function(match, group1) {
      return group1.toUpperCase();
    });
// hello-world => helloWorld
*/