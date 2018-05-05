/*
 * src/index.js
 *
 **/

const express = require('express')
import bodyParser from 'body-parser'
import path from 'path'
import helmet from 'helmet'
import morgan from 'morgan'

import config from './config'

import Database from './database'

// Infra
import Schema from './schema'

// Services
import FoodService from './food-service'

// Schemas
import FoodSchema from './schema/food.json'

// main is where our application resides

// Create a new application
const app = express()
const schema = Schema()

schema.add('food', FoodSchema)

// Middlewares
middlewares(app)

// Host the schemas as static file
app.use('/schemas', express.static(path.join(__dirname, 'schema')))

const db = Database(config.get('db'))

const services = [
    FoodService
    // Would make much more sense when you have multiple services
    // in the same application. e.g.
    // ServiceA
    // ServiceB
    // ServiceC
].map(service => service({ db, schema }))

// Initialize service by looping through them
services.forEach((service) => {
    app.use(service.basePath, service.route)
})

app.get('/', async (req, res) => {
    res.status(200).json({
        endpoints: services.map((service) => service.info),
        routes: app.routes
    })
})

// NOTE: It is always a good practice to have a health endpoint that checks every dependency you
// have, such as databases/redis connection. It can be a simple PING to the database.
app.get('/health', (req, res) => {
    res.status(200).json({
        "health": "Ok"
    })
})

app.use(function(req, res, next) {
    res.status(404).json({
        "message": "Resource not found."
    });
});

app.listen(config.get('port'), () => {
    console.log('\n==================================================================================')
    console.log(`listening to port *:${config.get('port')}. press ctrl + c to cancel`)
    console.log('==================================================================================\n')
})

// middlewares takes the app, and inject the app with middlewares
function middlewares (app) {
    app.use(bodyParser.urlencoded({ extended: false }))
    // To parse json
    app.use(bodyParser.json())

    // For security
    app.use(helmet())

    // Enable logging during development
    app.use(morgan('dev', {
        skip(req, res) {
            return res.statusCode < 400
        },
        stream: process.stderr
    }))

    app.use(morgan('dev', {
        skip(req, res) {
            return res.statusCode >= 400
        },
        stream: process.stdout
    }))
}

module.exports = app
