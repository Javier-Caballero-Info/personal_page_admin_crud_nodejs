import Store from '../generic-service/store'
import Model from './model'
import Route from './route'

import express from 'express'
const router = express.Router()
const PATH = '/social-network/'

function Service ({ db, schema }) {
    const store = Store(db, PATH)
    const model = Model({ store, schema })
    const route = Route(model)

    router
        .get('/:lang/social-networks', route.getSocialNetworks)
        .get('/:lang/social-networks/:id', route.getSocialNetwork)
        .post('/:lang/social-networks', route.postSocialNetwork)
        .put('/:lang/social-networks/:id', route.putSocialNetwork)
        .delete('/:lang/social-networks/:id', route.deleteSocialNetwork)

    return router
}

export default (options) => {
    return {
        basePath: '/',
        info: {
            name: 'Social Networks',
            paths: {
                one: {
                    method: 'GET',
                    path: '/social-networks/:lang/:id'
                },
                all: {
                    method: 'GET',
                    path: '/social-networks/:lang'
                },
                create: {
                    method: 'POST',
                    path: '/social-networks/:lang'
                },
                update: {
                    method: 'PUT',
                    path: '/social-networks/:lang/:id'
                },
                remove: {
                    method: 'DELETE',
                    path: '/social-networks/:lang/:id'
                }
            }
        },
        route: Service(options)
    }
}
