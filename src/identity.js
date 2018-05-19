// An identity transform which makes no changes when applied.

export default (file, api) => {
  const js = api.jscodeshift
  const root = js(file.source)
  return root.toSource()
}
