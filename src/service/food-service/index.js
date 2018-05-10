import Store from '../generic-service/store'
import Model from './model'
import Route from './route'

import express from 'express'
const router = express.Router()
const PATH = '/food/'


function Service ({ db, schema }) {
  const store = Store(db, PATH)
  const model = Model({ store, schema })
  const route = Route(model)

  router
    .get('/', route.getFoods)
    .get('/:id', route.getFood)
    .post('/', route.postFood)
    .put('/:id', route.putFood)
    .delete('/:id', route.deleteFood)

  return router
}

export default (options) => {
  return {
    info: {
      name: 'Food Service',
      description: 'CRUD Food',
      paths: {
        one: {
          method: 'GET',
          path: '/foods/:id'
        },
        all: {
          method: 'GET',
          path: '/foods'
        },
        create: {
          method: 'POST',
          path: '/foods'
        },
        update: {
          method: 'PUT',
          path: '/foods'
        },
        remove: {
          method: 'DELETE',
          path: '/foods/:id'
        }
      }
    },
    route: Service(options)
  }
}
