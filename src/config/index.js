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

const SECRET = {
    doc: 'Secret key for JWT',
    format: String,
    default: 'SecretJWT',
    env: 'SECRET'
}

const config = convict({
    port: PORT,
    secret: SECRET,
    db: DB
})

const validated = config.validate({ allowed: 'strict' })

export default validated
