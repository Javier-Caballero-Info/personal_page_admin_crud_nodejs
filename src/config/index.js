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

const JWT_SECRET_KEY = {
    doc: 'Secret key for JWT',
    format: String,
    default: 'jwt-secret-string',
    env: 'JWT_SECRET_KEY'
}

const JWT_SIGN_ALGORITHM = {
    doc: 'Algorithm for JWT',
    format: String,
    default: 'HS256',
    env: 'JWT_SIGN_ALGORITHM'
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
    jwt_secret: JWT_SECRET_KEY,
    jwt_algorithm: JWT_SIGN_ALGORITHM,
    new_relic: NEW_RELIC,
    db: DB
})

const validated = config.validate({ allowed: 'strict' })

export default validated
