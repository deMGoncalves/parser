window.__parser = (window.parser || {})

;(() => {
  const cache = new Map()

  const memoize = (target) =>
    (...args) =>
      ((key) => (
        cache.has(key)
          ? cache.get(key)
          : (cache.set(key, target(...args)), cache.get(key))
      ))(JSON.stringify(args))

  const createElement = memoize((tagName, is) => (
    new DOMParser()
      .parseFromString(
        `<${tagName} ${is} />`,
        'text/html'
      )
      .body
      .firstChild
  ))

  const mountIs = memoize((is) => (
    is ? `is=${is}` : ''
  ))

  window.__parser.mount = (ast) => {
    const { attributes, className, children, events, is, tagName } = ast
    const element = createElement(
      tagName,
      mountIs(is)
    )

    return element.cloneNode(true)
  }
})()
