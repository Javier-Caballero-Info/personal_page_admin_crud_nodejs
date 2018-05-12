import Store from '../generic-service/store'
import Model from './model'
import Route from './route'

import express from 'express'
const router = express.Router()

function Service ({ db, schema }) {
    const store = Store(db, '/scholastic/')
    const model = Model({ store, schema })
    const route = Route(model)

    router
        .get('/:lang/scholastic', route.getAllScholastic)
        .get('/:lang/scholastic/:id', route.getScholastic)
        .post('/:lang/scholastic', route.postScholastic)
        .put('/:lang/scholastic/:id', route.putScholastic)
        .delete('/:lang/scholastic/:id', route.deleteScholastic)

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
                    path: '/scholastic/:lang/:id'
                },
                all: {
                    method: 'GET',
                    path: '/scholastic/:lang'
                },
                create: {
                    method: 'POST',
                    path: '/scholastic/:lang'
                },
                update: {
                    method: 'PUT',
                    path: '/scholastic/:lang/:id'
                },
                remove: {
                    method: 'DELETE',
                    path: '/scholastic/:lang/:id'
                }
            }
        },
        route: Service(options)
    }
}
