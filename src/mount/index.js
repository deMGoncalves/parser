;(() => {
  const cache = new Map()

  const memoize = (target) =>
    (...args) =>
      ((key) => (
        cache.has(key)
          ? cache.get(key)
          : (cache.set(key, target(...args)), cache.get(key))
      ))(JSON.stringify(args))

  const createElement = memoize((tagName, is, className) => (
    new DOMParser()
      .parseFromString(
        `<${tagName} ${is} ${className} />`,
        'text/html'
      )
      .body
      .firstChild
  ))

  const mountIs = memoize((is) => (
    is ? `is="${is}"` : ''
  ))

  const mountClassName = memoize((className) => (
    className ? `class="${className}"` : ''
  ))

  window.__parser = (window.__parser || {})
  window.__parser.mount = (ast) => {
    const { attributes, className, children, events, is, tagName } = ast
    const element = createElement(
      tagName,
      mountIs(is),
      mountClassName(className)
    )

    return element.cloneNode(true)
  }
})()
