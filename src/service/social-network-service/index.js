import Store from '../generic-service/store'
import Model from './model'
import Route from './route'

import verifyToken from '../../util/verify_token'

import express from 'express'

const router = express.Router()

function Service ({ db, schema }) {
    const store = Store(db, '/social-network/')
    const model = Model({ store, schema })
    const route = Route(model)

    router
        .get('/:lang/social-networks', verifyToken, route.getAllSocialNetworks)
        .get('/:lang/social-networks/:id', verifyToken, route.getSocialNetwork)
        .post('/:lang/social-networks', verifyToken, route.postSocialNetwork)
        .put('/:lang/social-networks/:id', verifyToken, route.putSocialNetwork)
        .delete('/:lang/social-networks/:id', verifyToken, route.deleteSocialNetwork)

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
                    path: '/:lang/social-networks/:id'
                },
                all: {
                    method: 'GET',
                    path: '/:lang/social-networks'
                },
                create: {
                    method: 'POST',
                    path: '/:lang/social-networks'
                },
                update: {
                    method: 'PUT',
                    path: '/:lang/social-networks/:id'
                },
                remove: {
                    method: 'DELETE',
                    path: '/:lang/social-networks/:id'
                }
            }
        },
        route: Service(options)
    }
}
