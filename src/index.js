/*
 * src/index.js
 *
 **/

require('newrelic')
const express = require('express')
import cors from 'cors'
import bodyParser from 'body-parser'
import path from 'path'
import helmet from 'helmet'
import morgan from 'morgan'

import config from './config'

import Database from './database'

// Infra
import Schema from './schema'

import SocialNetworkService from './service/social-network-service'
import ContactService from './service/contact-service'
import EducationService from './service/education-service'
import ReseachService from './service/research-service'
import ScholasticService from './service/scholastic-service'
import WorkService from './service/work-service'

// Schemas
import SocialNetworkSchema from './schema/social-network.json'
import ContactSchema from './schema/contact.json'
import EducationSchema from './schema/education.json'
import ResearchSchema from './schema/research.json'
import ScholasticSchema from './schema/scholastic.json'
import WorkSchema from './schema/work.json'

// main is where our application resides

// Create a new application
const app = express()
const schema = Schema()

var dd_options = {
  'response_code':true,
  'tags': ['app:Personal Page Admin - NodeJS']
}

var connect_datadog = require('connect-datadog')(dd_options);

schema.add('social-network', SocialNetworkSchema)
schema.add('contact', ContactSchema)
schema.add('education', EducationSchema)
schema.add('research', ResearchSchema)
schema.add('scholastic', ScholasticSchema)
schema.add('work', WorkSchema)

// Middlewares
middlewares(app)

// Host the schemas as static file
app.use('/schemas', express.static(path.join(__dirname, 'schema')))

const db = Database(config.get('db'))

const services = [
    SocialNetworkService,
    ContactService,
    EducationService,
    ReseachService,
    ScholasticService,
    WorkService
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

    app.use(connect_datadog);

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

    app.use(cors())

}

module.exports = app
