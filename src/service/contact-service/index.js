import Store from '../generic-service/store'
import Model from './model'
import Route from './route'

import express from 'express'

import verifyToken from '../../util/verify_token'

const router = express.Router()

function Service ({ db, schema }) {
    const store = Store(db, '/contact/')
    const model = Model({ store, schema })
    const route = Route(model)

    router
        .get('/:lang/contacts', verifyToken, route.getAllContacts)
        .get('/:lang/contacts/:id', verifyToken, route.getContact)
        .post('/:lang/contacts', verifyToken, route.postContact)
        .put('/:lang/contacts/:id', verifyToken, route.putContact)
        .delete('/:lang/contacts/:id', verifyToken, route.deleteContact)

    return router
}

export default (options) => {
    return {
        basePath: '/',
        info: {
            name: 'Contacts',
            paths: {
                one: {
                    method: 'GET',
                    path: '/:lang/contacts/:id'
                },
                all: {
                    method: 'GET',
                    path: '/:lang/contacts'
                },
                create: {
                    method: 'POST',
                    path: '/:lang/contacts'
                },
                update: {
                    method: 'PUT',
                    path: '/:lang/contacts/:id'
                },
                remove: {
                    method: 'DELETE',
                    path: '/:lang/contacts/:id'
                }
            }
        },
        route: Service(options)
    }
}
