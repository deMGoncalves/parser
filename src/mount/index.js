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

  const createElement = memoize((tagName) => (
    new DOMParser()
      .parseFromString(
        `<${tagName} />`,
        'text/html'
      )
      .body
      .firstChild
  ))

  window.__parser.mount = (ast) => {
    const { attributes, className, children, events, is, tagName } = ast
    const element = createElement(
      tagName
    )

    return element.cloneNode(true)
  }
})()
