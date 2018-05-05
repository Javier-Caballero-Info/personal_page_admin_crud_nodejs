/*
 * src/food-service/index.js 
**/

import Store from './store'
import Model from './model'
import Route from './route'

import express from 'express'
const router = express.Router()

function Service ({ db, schema }) {
  const store = Store(db)
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
    basePath: '/foods',
    info: {
      name: 'Food Service',
      service: 'food',
      version: '1.0.0',
      description: 'Endpoint service the food service',
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
