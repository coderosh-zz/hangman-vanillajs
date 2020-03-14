class Selector {
  constructor(selector) {
    this.selector = selector
  }

  query() {
    return document.querySelector(this.selector)
  }

  queryAll(options = { data: false }) {
    let arr = []
    document.querySelectorAll(this.selector).forEach((node, index) => {
      arr.push(new Selector(`.${node.className}:nth-child(${index + 1})`))
    })
    this.arr = arr

    return options.data === true ? arr : this
  }

  all(callback) {
    this.arr.forEach(callback)
  }

  listen(action, callback) {
    return this.query().addEventListener(action, callback)
  }

  value(val) {
    if (val !== undefined) this.query().value = val
    return this.query().value
  }

  html(val) {
    if (val !== undefined) this.query().innerHTML = val
    return this.query().innerHTML
  }

  text(val) {
    if (val !== undefined) this.query().textContent = val
    return this.query().textContent
  }

  style(key, value) {
    if (key !== undefined && value !== undefined)
      this.query().style[key] = value

    if (key === undefined && value === undefined) return this.query().style

    return this.query().style[key]
  }
}

const Select = selector => {
  if (document.querySelector(selector) === null) {
    document.body.innerHTML = `
        <div class="container">
          <div>SELECTOR ERROR</div>
          <h3>'${selector}' not found in your document</h3>
          <p>Please check your code</p>
        </div>
    `
    document.head.innerHTML = `
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error: 'imga' not found</title>
        <style>
          body {
            font-family: sans-serif;
            background: #cc6666;
            color: #f4f4f4;
          }

          .container{
            width: 90%;
            margin: auto;
            background: #cc5555;
            padding: 20px;
            max-width: 750px;
          }

          h3{
            font-weight: 400;
          }

          p{
            font-size: 15px;
            font-weight: 400;
            font-style: italic;
          }
        </style>
    `
    throw new Error(`'${selector}' not found in your document`)
  }

  return new Selector(selector)
}

export default Select
