/**
 * [JavaScript privates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields)
 * are protected at runtime, TypeScript privates are not. This is an explicit
 * [language design goal](https://github.com/microsoft/TypeScript-wiki/blob/main/TypeScript-Design-Goals.md#goals):
 *
 * > Impose no runtime overhead on emitted programs.
 *
 * Eg:
 *
 * ```ts
 * class TSPrivate {
 *   private foo: number;
 *   constructor(foo: number) { this.foo = foo }
 *   get getFoo(): number { return this.foo }
 *   set setFoo(foo: number) { this.foo = foo }
 * }
 * // @ts-ignore
 * console.log(new TSPrivate(1).foo) // 1, no runtime protection code generated.
 *
 * class ESPrivate {
 *   #foo: number;
 *   constructor(foo: number) { this.#foo = foo }
 *   get getFoo(): number { return this.#foo }
 *   set setFoo(foo: number) { this.#foo = foo }
 * }
 * // @ts-ignore
 * console.log(new ESPrivate(2)#foo) // Protected, SyntaxError.
 * ```
 *
 * An additional goal of the language is:
 *
 * > Align with current and future ECMAScript proposals.
 *
 * However, `private` predates JavaScript privates so it's now an outdated
 * pattern, in my understanding.
 *
 * One doesn't have to use a language how it was designed to be used but I think
 * a good reason is wanted to deviate.
 *
 * Lastly, while the syntax of private class fields looks funky, it is concise
 * and, more importantly, furnishes a nice pattern for distinguish private and
 * public fields with otherwise identical names:
 *
 * ```ts
 * class Fruit {
 *   private banana: string = 'banana' // Error: Duplicate identifier 'banana.
 *   get banana(): string {return this.banana}
 *   set banana(banana: string) {this.banana = banana}
 * }
 * ```
 *
 * ```ts
 * class Fruit {
 *   #banana: string = 'banana' // OK.
 *   get banana(): string {return this.#banana}
 *   set banana(banana: string) {this.#banana = banana}
 * }
 * ```
 */

import type {ClassProperty, Transform} from 'jscodeshift'

const transform: Transform = (fileInfo, api) => {
  const js = api.jscodeshift

  const renamedPrivates = new Set()
  const renamedClassPropertySource = js(fileInfo.source)
    .find(js.ClassProperty, {
      type: 'ClassProperty',
      key: {type: 'Identifier'},
      accessibility: 'private',
    } as ClassProperty & Record<'accessibility', 'private'>)
    .forEach((expr) => {
      const {
        value,
      }: {
        value: ClassProperty & Partial<Record<'accessibility', string | null>>
      } = expr
      if (value.key.type != 'Identifier') return

      renamedPrivates.add(value.key.name)
      value.accessibility = null
      value.key.name = renameField(value.key.name)
    })
    .toSource()

  const renamedClassMethodSource = js(renamedClassPropertySource)
    .find(js.ClassMethod, {
      accessibility: 'private',
      type: 'ClassMethod',
    })
    .forEach(({value}) => {
      if (value.key.type != 'Identifier') return
      renamedPrivates.add(value.key.name)
      value.accessibility = null
      value.key.name = renameField(value.key.name)
    })
    .toSource()

  return js(renamedClassMethodSource)
    .find(js.MemberExpression, {
      type: 'MemberExpression',
      object: {type: 'ThisExpression'},
      property: {type: 'Identifier'},
    })
    .forEach((expr) => {
      if (expr.value.property.type != 'Identifier') return
      if (!renamedPrivates.has(expr.value.property.name)) return
      expr.value.property.name = renameField(expr.value.property.name)
    })
    .toSource()
}

function renameField(name: string): string {
  return `#${name.replace(/^_/, '')}`
}

export default transform
