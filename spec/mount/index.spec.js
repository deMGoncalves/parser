describe('__parser.mount', () => {
  it('Mount deve ser definido no escopo do parser', () => {
    expect(window.__parser.mount).toBeDefined()
  })

  it('Deve criar o mesmo elemento do tagName', () => {
    const ast = {
      tagName: 'div'
    }

    const element = __parser.mount(ast)

    expect(element.tagName).toBe('DIV')
  })
})
