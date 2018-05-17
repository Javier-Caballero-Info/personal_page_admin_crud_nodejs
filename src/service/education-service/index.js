import Store from '../generic-service/store'
import Model from './model'
import Route from './route'

import verifyToken from '../../util/verify_token'

import express from 'express'

const router = express.Router()

function Service ({ db, schema }) {
    const store = Store(db, '/education/')
    const model = Model({ store, schema })
    const route = Route(model)

    router
        .get('/:lang/educations', verifyToken, route.getAllEducations)
        .get('/:lang/educations/:id', verifyToken, route.getEducation)
        .post('/:lang/educations', verifyToken, route.postEducation)
        .put('/:lang/educations/:id', verifyToken, route.putEducation)
        .delete('/:lang/educations/:id', verifyToken, route.deleteEducation)

    return router
}

export default (options) => {
    return {
        basePath: '/',
        info: {
            name: 'Educations',
            paths: {
                one: {
                    method: 'GET',
                    path: '/educations/:lang/:id'
                },
                all: {
                    method: 'GET',
                    path: '/educations/:lang'
                },
                create: {
                    method: 'POST',
                    path: '/educations/:lang'
                },
                update: {
                    method: 'PUT',
                    path: '/educations/:lang/:id'
                },
                remove: {
                    method: 'DELETE',
                    path: '/educations/:lang/:id'
                }
            }
        },
        route: Service(options)
    }
}
