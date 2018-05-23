import Store from '../generic-service/store'
import Model from './model'
import Route from './route'

import verifyToken from '../../util/verify_token'

import express from 'express'

const router = express.Router()

function Service ({ db, schema }) {
    const store = Store(db, '/work/')
    const model = Model({ store, schema })
    const route = Route(model)

    router
        .get('/:lang/works', verifyToken, route.getAllWorks)
        .get('/:lang/works/:id', verifyToken, route.getWork)
        .post('/:lang/works', verifyToken, route.postWork)
        .put('/:lang/works/:id', verifyToken, route.putWork)
        .delete('/:lang/works/:id', verifyToken, route.deleteWork)

    return router
}

export default (options) => {
    return {
        basePath: '/',
        info: {
            name: 'Works',
            paths: {
                one: {
                    method: 'GET',
                    path: '/:lang/works/:id'
                },
                all: {
                    method: 'GET',
                    path: '/:lang/works'
                },
                create: {
                    method: 'POST',
                    path: '/:lang/works'
                },
                update: {
                    method: 'PUT',
                    path: '/:lang/works/:id'
                },
                remove: {
                    method: 'DELETE',
                    path: '/:lang/works/:id'
                }
            }
        },
        route: Service(options)
    }
}
