const chai = require('chai')
const chaiHttp = require('chai-http')

let app = require('../../src/index')

chai.should()
chai.use(chaiHttp)

const expect = chai.expect

describe('Authoization', () => {

    const lang = 'es'

    const base_path = '/' + lang + '/educations'

    const invalidAuthorizationToken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJleHAiOjE1Mjk1Mjc4MjYsImlhdCI6MTUyOTUyNjkyNiwibmJmIjoxNTI5NTI2OTI2LCJqdGkiOiIyNjNhNTY4Zi0yN2ZkLTRlZTgtOGU4Zi1jMTZkODBiZDUwOGYiLCJpZGVudGl0eSI6Ii1MRHFwVmdtYkJvOFpCTl9RZzE0IiwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.Fq-TeW10jseAtsjabNUpiYPxFdLFcnQKBTUX9wj9JHXtz8Bu8TahGho4mCQBShDc'

    it('Authorization token - Not present', () => {

        return chai.request(app)
            .get(base_path)
            .then(res => {
                res.should.have.status(403)
                expect(res.body.auth).to.be.eq(false)
                expect(res.body.message).to.be.eq('No token provided.')
            })
            .catch(err => {
                throw err
            })
    })

    it('Authorization token - Not valid format', () => {

        return chai.request(app)
            .get(base_path)
            .set('authorization', 'fakeToken')
            .then(res => {
                res.should.have.status(403)
                expect(res.body.auth).to.be.eq(false)
                expect(res.body.message).to.be.eq('No token provided.')
            })
            .catch(err => {
                throw err
            })
    })

    it('Authorization token - Invalid token', () => {

        return chai.request(app)
            .get(base_path)
            .set('authorization', 'BEARER fakeToken')
            .then(res => {
                res.should.have.status(403)
                expect(res.body.auth).to.be.eq(false)
                expect(res.body.message).to.be.eq('No token provided.')
            })
            .catch(err => {
                throw err
            })
    })

    it('Authorization token - Failed to authenticate token.', () => {

        return chai.request(app)
            .get(base_path)
            .set('authorization', invalidAuthorizationToken)
            .then(res => {
                res.should.have.status(403)
                expect(res.body.error).to.be.eq('E0101')
                expect(res.body.message).to.be.eq('Failed to authenticate token.')
            })
            .catch(err => {
                throw err
            })
    })

})