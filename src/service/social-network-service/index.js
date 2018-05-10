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
    .get('/', route.getSocialNetworks)
    .get('/:id', route.getSocialNetwork)
    .post('/', route.postSocialNetwork)
    .put('/:id', route.putSocialNetwork)
    .delete('/:id', route.deleteSocialNetwork)

  return router
}

export default (options) => {
  return {
    info: {
      name: 'Social Networks',
      paths: {
        one: {
          method: 'GET',
          path: '/social-networks/:id'
        },
        all: {
          method: 'GET',
          path: '/social-networks'
        },
        create: {
          method: 'POST',
          path: '/social-networks'
        },
        update: {
          method: 'PUT',
          path: '/social-networks/:id'
        },
        remove: {
          method: 'DELETE',
          path: '/social-networks/:id'
        }
      }
    },
    route: Service(options)
  }
}
