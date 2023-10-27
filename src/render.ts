interface VNode {
  tag: string | ComponetRender
  props: Record<string, any>
  children: string | Array<any>
}

interface ComponetRender {
  render: () => VNode
  [key: string]: any
}

function mountElement(vnode: VNode, container: HTMLElement) {
  const el = document.createElement(vnode.tag as string)

  // 遍历Props
  for (const key in vnode.props) {
    if ((/^on/).test(key)) {
      el.addEventListener(
        key.substring(2, key.length).toLocaleLowerCase(),
        vnode.props[key]
      )
    }
  }

  if (typeof vnode.children === 'string') {
    el.appendChild(document.createTextNode(vnode.children))
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach((child) => renderer(child, el))
  }

  container.appendChild(el)
}

function mountComponent(vnode: VNode, container: HTMLElement) {
  const subtree = (vnode.tag as ComponetRender).render()
  renderer(subtree, container)
}

export function renderer(vnode: VNode, container: HTMLElement) {
  if (typeof vnode.tag === 'string') {
    mountElement(vnode, container)
  } else if (typeof vnode.tag === 'object') {
    mountComponent(vnode, container)
  }
}
