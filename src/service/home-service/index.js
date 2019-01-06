import Store from '../generic-service/store'
import Model from './model'
import Route from './route'

import verifyToken from '../../util/verify_token'

import express from 'express'

const router = express.Router()

function Service ({ db, schema }) {
    const store = Store(db, '/home/')
    const model = Model({ store, schema })
    const route = Route(model)

    router
        .get('/:lang/home', verifyToken, route.getHome)
        .put('/:lang/home', verifyToken, route.putHome)

    return router
}

export default (options) => {
    return {
        basePath: '/',
        info: {
            name: 'Home',
            paths: {
                one: {
                    method: 'GET',
                    path: '/:lang/home'
                },
                update: {
                    method: 'PUT',
                    path: '/:lang/home'
                }
            }
        },
        route: Service(options)
    }
}
