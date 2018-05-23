import Store from '../generic-service/store'
import Model from './model'
import Route from './route'

import verifyToken from '../../util/verify_token'

import express from 'express'

const router = express.Router()

function Service ({ db, schema }) {
    const store = Store(db, '/research/')
    const model = Model({ store, schema })
    const route = Route(model)

    router
        .get('/:lang/researches', verifyToken, route.getAllResearches)
        .get('/:lang/researches/:id', verifyToken, route.getResearch)
        .post('/:lang/researches', verifyToken, route.postResearch)
        .put('/:lang/researches/:id', verifyToken, route.putResearch)
        .delete('/:lang/researches/:id', verifyToken, route.deleteResearch)

    return router
}

export default (options) => {
    return {
        basePath: '/',
        info: {
            name: 'Researches',
            paths: {
                one: {
                    method: 'GET',
                    path: '/:lang/researches/:id'
                },
                all: {
                    method: 'GET',
                    path: '/:lang/researches'
                },
                create: {
                    method: 'POST',
                    path: '/:lang/researches'
                },
                update: {
                    method: 'PUT',
                    path: '/:lang/researches/:id'
                },
                remove: {
                    method: 'DELETE',
                    path: '/:lang/researches/:id'
                }
            }
        },
        route: Service(options)
    }
}
