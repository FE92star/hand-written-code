interface TreeNode {
  id: string
  title: string
  pid: string
  children?: TreeNode[]
}

type ListNode = Exclude<TreeNode, 'children'>

export function transformTree2List(trees: TreeNode[]) {
  let list: ListNode[] = []

  for (const tree of trees) {
    const { id, title, pid } = tree

    list.push({
      id,
      title,
      pid
    })

    if (tree?.children?.length) {
      list = list.concat(transformTree2List(tree.children))
    }
  }

  return list
}

export function transformList2Tree(arr: ListNode[]) {
  const list = [];
  const hashmap: Record<string, any> = {};

  for (let i = 0; i < arr.length; i++) {
    // 存储每个id下的子元素
    let pid = arr[i].pid
    let id = arr[i].id


    if (!hashmap[id]) {
      hashmap[id] = { children: [] }
    }

    hashmap[id] = { ...arr[i], children: hashmap[id].children }

    if (pid === '0') {
      list.push(hashmap[id]);
    } else {
      if (!hashmap[pid]) {
        hashmap[pid] = {
          children: []
        }
      }

      hashmap[pid].children.push(hashmap[id])
    }
  }
  return list
}
