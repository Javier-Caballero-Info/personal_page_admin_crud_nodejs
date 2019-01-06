import Store from '../generic-service/store'
import Model from './model'
import Route from './route'

import verifyToken from '../../util/verify_token'

import express from 'express'

const router = express.Router()

function Service ({ db, schema }) {
    const store = Store(db, '/home/menu/')
    const model = Model({ store, schema })
    const route = Route(model)

    router
        .get('/:lang/menu-items', verifyToken, route.getAllMenuItems)
        .get('/:lang/menu-items/:id', verifyToken, route.getMenuItem)
        .post('/:lang/menu-items', verifyToken, route.postMenuItem)
        .put('/:lang/menu-items/:id', verifyToken, route.putMenuItem)
        .delete('/:lang/menu-items/:id', verifyToken, route.deleteMenuItem)

    return router
}

export default (options) => {
    return {
        basePath: '/',
        info: {
            name: 'Menu Items',
            paths: {
                one: {
                    method: 'GET',
                    path: '/:lang/menu-items/:id'
                },
                all: {
                    method: 'GET',
                    path: '/:lang/menu-items'
                },
                create: {
                    method: 'POST',
                    path: '/:lang/menu-items'
                },
                update: {
                    method: 'PUT',
                    path: '/:lang/menu-items/:id'
                },
                remove: {
                    method: 'DELETE',
                    path: '/:lang/menu-items/:id'
                }
            }
        },
        route: Service(options)
    }
}
