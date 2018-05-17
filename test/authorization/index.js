const chai = require('chai')
const chaiHttp = require('chai-http')

let app = require('../../src/index')

chai.should()
chai.use(chaiHttp)

const expect = chai.expect

describe('Authoization', () => {

    const lang = 'es'

    const base_path = '/' + lang + '/educations'

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
                expect(res.body.message).to.be.eq('Failed to authenticate token.')
            })
            .catch(err => {
                throw err
            })
    })

})