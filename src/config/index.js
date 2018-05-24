/*
 * src/config/index.js
 **/

import convict from 'convict'

import DB from './database'

const APP_NAME = {
    doc: 'Name of the app',
    format: String,
    default: 'Personal Page Admin - NodeJS',
    env: 'APP_NAME'
}

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

const NEW_RELIC = {
    doc: 'Secret key for New Relic',
    format: String,
    default: 'ABC123',
    env: 'NEW_RELIC'
}

const config = convict({
    app_name: APP_NAME,
    port: PORT,
    secret: SECRET,
    new_relic: NEW_RELIC,
    db: DB
})

const validated = config.validate({ allowed: 'strict' })

export default validated
