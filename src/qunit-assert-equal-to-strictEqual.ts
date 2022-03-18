// Many JavaScript developers agree to favor strict equality (===) to loose
// equality (==). This refactor makes the same argument for tests that strict is
// generally safer.
// https://api.qunitjs.com/assert/strictEqual
// https://api.qunitjs.com/assert/equal

import type {Transform} from 'jscodeshift'

const transform: Transform = (file, api) => {
  const js = api.jscodeshift

  return js(file.source)
    .find(js.CallExpression, {
      callee: {
        type: 'MemberExpression',
        object: {type: 'Identifier', name: 'assert'},
        property: {type: 'Identifier', name: 'equal'},
      },
    })
    .forEach((expr) => {
      if (expr.value.callee.type != 'MemberExpression') return
      if (expr.value.callee.property.type != 'Identifier') return
      expr.value.callee.property.name = 'strictEqual'
    })
    .toSource()
}

export default transform
