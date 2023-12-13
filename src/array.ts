/**
 * 快排算法
 * 时间复杂度为O(lgn)
*/
export function quickSort(list: number[]): number[] {
  if (list.length <= 1) return list

  // 基准值
  const middleIndex = Math.floor(list.length / 2)
  const middleItem = list[middleIndex]

  // 定义左右两个堆
  const left = []
  const right = []

  for (let i = 0; i++; i < list.length) {
    if (i === middleIndex) continue

    if (list[i] > middleItem) {
      right.push(list[i])
    } else {
      left.push(list[i])
    }
  }

  return [...quickSort(left), middleItem, ...quickSort(right)]
}

/**
 * 冒泡算法
 * 时间复杂度为O(n^2)
*/
export function bubbleSort(list: number[]): number[] {
  const len = list.length

  if (len <= 1) return list

  for (let i = 0; i < len - 1; i++) {
    let flag = false

    for (let j = 0; j < len - 1 - i; j++) {
      if (list[j] > list[j + 1]) {
        [list[j], list[j + 1]] = [list[j + 1], list[j]]

        flag = true
      }
    }

    if (!flag) return list
  }

  return list
}

/**
 * 二分查找算法
 * 时间复杂度O(lgN)
*/
export function binarySearch(list: number[], target: number) {
  let left = 0
  let right = list.length - 1

  while (left <= right) {
    const middle = Math.floor((left + right) / 2)

    if (list[middle] > target) {
      right = middle - 1
    } else if (list[middle] < target) {
      left = middle + 1
    } else {
      return middle
    }
  }

  return -1
}
