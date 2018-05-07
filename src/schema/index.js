/*
 * src/schema/index.js
 *
**/

import Ajv from 'ajv'

const Schema = () => {
  const ajv = new Ajv({
    allErrors: true, // Tell AJV to return all errors, instead of just 1 error
    removeAdditional: true, // Remove additional fields that is not specified in the payload
    coerceTypes: true // Convert the type to the specified type (e.g. string to int)
  })

  const schemas = {}

  return {
    add (name, schema) {
      const hasName = name && name.trim().length
      if (!hasName || !schema) {
        throw new Error('schemaError: name and schema must be provided')
      }
      schemas[name] = ajv.compile(schema)
    },
    validate (name, params) {
      const schema = schemas[name]
      if (!schema) {
        return Promise.reject(new Error(`schema ${name} does not exist`))
      }
      const validate = schema(params)
      if (!validate) {
        return Promise.reject(schema.errors)
      }
      return params
    }
/*
    // Load the schema from a uri
    async addFromUrl (name, uri) {
      const schema = await request({
        uri,
        json: true
      })
      schemas[name] = ajv.compile(schema)
      return true
    }
*/
  }
}



export default Schema
