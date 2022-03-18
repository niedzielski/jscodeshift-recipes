import {defineTest} from 'jscodeshift/src/testUtils'

defineTest(
  __dirname,
  'ts-privates-to-es-private-fields',
  null,
  'ts-privates-to-es-private-fields',
  {parser: 'ts'}
)
