// An identity transform which makes no changes when applied.

import type {Transform} from 'jscodeshift'

const transform: Transform = (file, api) => {
  return api.jscodeshift(file.source).toSource()
}

export default transform
