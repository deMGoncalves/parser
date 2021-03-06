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

  it('Deve extender o elemento para o web component em is', () => {
    const ast = {
      tagName: 'p',
      is: 'word-count'
    }

    const element = __parser.mount(ast)

    expect(element.tagName).toBe('P')
    expect(element.getAttribute('is')).toBe('word-count')
  })

  it('Deve setar a class quem esta em className', () => {
    const ast = {
      tagName: 'strong',
      className: '_560viognfb6 _5akjce0n1ap'
    }

    const element = __parser.mount(ast)

    expect(element.tagName).toBe('STRONG')
    expect(element.className).toBe('_560viognfb6 _5akjce0n1ap')
  })
})
