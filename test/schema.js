/*
 * test/food-service/model.js
**/
/* eslint-env mocha */

import chai from 'chai'

import Schema from '../src/schema/index'


const expect = chai.expect


// In our test, we mock the store and only validate the model
// The route and store should not contain any business logic


describe('Schema Validation', () => {

  it('Schema is required', async () => {

  	try {
      	const schema = Schema()
		await schema.add()
    } catch (error) {
        expect(error).to.be.not.eq(null)
        expect(error.name).to.be.eq("Error")
        expect(error.message).to.be.eq('schemaError: name and schema must be provided')
    }

  })

  it('Schema not found', async () => {

  	try {
      	const schema = Schema()
		await schema.validate("schema404")

    } catch (error) {
        expect(error).to.be.not.eq(null)
        expect(error.name).to.be.eq("Error")
        expect(error.message).to.be.eq('schema schema404 does not exist')
    }

  })
  
})