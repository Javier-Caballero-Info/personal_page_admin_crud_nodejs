import Store from '../generic-service/store'
import Model from './model'
import Route from './route'

import express from 'express'
const router = express.Router()

function Service ({ db, schema }) {
    const store = Store(db, '/education/')
    const model = Model({ store, schema })
    const route = Route(model)

    router
        .get('/:lang/educations', route.getAllEducations)
        .get('/:lang/educations/:id', route.getEducation)
        .post('/:lang/educations', route.postEducation)
        .put('/:lang/educations/:id', route.putEducation)
        .delete('/:lang/educations/:id', route.deleteEducation)

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
