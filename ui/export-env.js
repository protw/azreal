/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { writeFileSync } = require('fs')

require('dotenv').config()

const varsToExport = [
  'HASURA_GRAPHQL_ADMIN_SECRET',
  'AIRLY_API_KEY',
  'GRAPHQL_ENDPOINT',
  'MONGO_API_ENDPOINT',
  'AUTH_API_ENDPOINT'
]

function getSerializedVal (varName) {
  const val = process.env[varName]
  return typeof val === 'string' ? `'${val}'` : val
}

const vals = varsToExport
  .map(varName => `${varName}: ${getSerializedVal(varName)}`)
  .join(',\n  ')

const jsFile = `${__dirname}/public/env.js`

console.log(`Export .env to ${jsFile}`)

writeFileSync(jsFile,
  `// WARN: This is a generated file. Do not modify!

if (!window.process) window.process = {};
if (!window.process.ENV) window.process.ENV = {};

window.process.env = {
  ${vals}
};
`, 'utf8'
)
