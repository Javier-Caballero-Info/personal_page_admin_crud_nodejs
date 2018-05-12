import Store from '../generic-service/store'
import Model from './model'
import Route from './route'

import express from 'express'
const router = express.Router()

function Service ({ db, schema }) {
    const store = Store(db, '/contact/')
    const model = Model({ store, schema })
    const route = Route(model)

    router
        .get('/:lang/contacts', route.getAllContacts)
        .get('/:lang/contacts/:id', route.getContact)
        .post('/:lang/contacts', route.postContact)
        .put('/:lang/contacts/:id', route.putContact)
        .delete('/:lang/contacts/:id', route.deleteContact)

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
                    path: '/contacts/:lang/:id'
                },
                all: {
                    method: 'GET',
                    path: '/contacts/:lang'
                },
                create: {
                    method: 'POST',
                    path: '/contacts/:lang'
                },
                update: {
                    method: 'PUT',
                    path: '/contacts/:lang/:id'
                },
                remove: {
                    method: 'DELETE',
                    path: '/contacts/:lang/:id'
                }
            }
        },
        route: Service(options)
    }
}
