import Store from '../generic-service/store'
import Model from './model'
import Route from './route'

import verifyToken from '../../util/verify_token'

import express from 'express'

const router = express.Router()

function Service ({ db, schema }) {
    const store = Store(db, '/scholastic/')
    const model = Model({ store, schema })
    const route = Route(model)

    router
        .get('/:lang/scholastic', verifyToken, route.getAllScholastic)
        .get('/:lang/scholastic/:id', verifyToken, route.getScholastic)
        .post('/:lang/scholastic', verifyToken, route.postScholastic)
        .put('/:lang/scholastic/:id', verifyToken, route.putScholastic)
        .delete('/:lang/scholastic/:id', verifyToken, route.deleteScholastic)

    return router
}

export default (options) => {
    return {
        basePath: '/',
        info: {
            name: 'Scholastic',
            paths: {
                one: {
                    method: 'GET',
                    path: '/:lang/scholastic/:id'
                },
                all: {
                    method: 'GET',
                    path: '/:lang/scholastic'
                },
                create: {
                    method: 'POST',
                    path: '/:lang/scholastic'
                },
                update: {
                    method: 'PUT',
                    path: '/:lang/scholastic/:id'
                },
                remove: {
                    method: 'DELETE',
                    path: '/:lang/scholastic/:id'
                }
            }
        },
        route: Service(options)
    }
}
