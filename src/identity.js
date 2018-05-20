// An identity transform which makes no changes when applied.

export default (file, api) => {
  return api.jscodeshift(file.source).toSource()
}
