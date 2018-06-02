import Store from '../generic-service/store'
import Model from './model'
import Route from './route'

import verifyToken from '../../util/verify_token'

import express from 'express'

const router = express.Router()

function Service ({ db, schema }) {
    const store = Store(db, '/portfolio/')
    const model = Model({ store, schema })
    const route = Route(model)

    router
        .get('/:lang/portfolios', verifyToken, route.getAllPortfolios)
        .get('/:lang/portfolios/:id', verifyToken, route.getPortfolio)
        .post('/:lang/portfolios', verifyToken, route.postPortfolio)
        .put('/:lang/portfolios/:id', verifyToken, route.putPortfolio)
        .delete('/:lang/portfolios/:id', verifyToken, route.deletePortfolio)

    return router
}

export default (options) => {
    return {
        basePath: '/',
        info: {
            name: 'Portfolios',
            paths: {
                one: {
                    method: 'GET',
                    path: '/:lang/portfolios/:id'
                },
                all: {
                    method: 'GET',
                    path: '/:lang/portfolios'
                },
                create: {
                    method: 'POST',
                    path: '/:lang/portfolios'
                },
                update: {
                    method: 'PUT',
                    path: '/:lang/portfolios/:id'
                },
                remove: {
                    method: 'DELETE',
                    path: '/:lang/portfolios/:id'
                }
            }
        },
        route: Service(options)
    }
}
