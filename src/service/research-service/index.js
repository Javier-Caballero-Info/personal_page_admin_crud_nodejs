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
                    path: '/researches/:lang/:id'
                },
                all: {
                    method: 'GET',
                    path: '/researches/:lang'
                },
                create: {
                    method: 'POST',
                    path: '/researches/:lang'
                },
                update: {
                    method: 'PUT',
                    path: '/researches/:lang/:id'
                },
                remove: {
                    method: 'DELETE',
                    path: '/researches/:lang/:id'
                }
            }
        },
        route: Service(options)
    }
}
