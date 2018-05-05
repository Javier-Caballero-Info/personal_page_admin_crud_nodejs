/*
 * src/config/index.js
**/

import convict from 'convict'

import DB from './database'

const PORT = {
  doc: 'The port to bind',
  format: 'port',
  default: '3000',
  env: 'PORT'
}

const config = convict({
  port: PORT,
  db: DB
})

const validated = config.validate({ allowed: 'strict' })

export default validated
