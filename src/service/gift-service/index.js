import Store from '../generic-service/store'
import Model from './model'
import Route from './route'

import verifyToken from '../../util/verify_token'

import express from 'express'

const router = express.Router()

function Service ({ db, schema }) {
    const store = Store(db, '/gift/')
    const model = Model({ store, schema })
    const route = Route(model)

    router
        .get('/:lang/gifts', verifyToken, route.getAllGifts)
        .get('/:lang/gifts/:id', verifyToken, route.getGift)
        .post('/:lang/gifts', verifyToken, route.postGift)
        .put('/:lang/gifts/:id', verifyToken, route.putGift)
        .delete('/:lang/gifts/:id', verifyToken, route.deleteGift)

    return router
}

export default (options) => {
    return {
        basePath: '/',
        info: {
            name: 'Gifts',
            paths: {
                one: {
                    method: 'GET',
                    path: '/:lang/gifts/:id'
                },
                all: {
                    method: 'GET',
                    path: '/:lang/gifts'
                },
                create: {
                    method: 'POST',
                    path: '/:lang/gifts'
                },
                update: {
                    method: 'PUT',
                    path: '/:lang/gifts/:id'
                },
                remove: {
                    method: 'DELETE',
                    path: '/:lang/gifts/:id'
                }
            }
        },
        route: Service(options)
    }
}
