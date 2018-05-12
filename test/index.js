
const chai = require('chai')
const chaiHttp = require('chai-http')


let app = require('../src/index')

chai.should()
chai.use(chaiHttp)
let expect = chai.expect;

describe('General Endpoints', () => {

    it('GET root (200)', () => {
        return chai.request(app)
            .get('/')
            .then(res => {
                res.should.have.status(200)
                expect(res.body.endpoints).to.be.a('array');
                expect(res.body.endpoints.length).to.be.gt(0);
            })
            .catch(err => {
                throw err
            })
    })

    it('GET health (200)', () => {
        return chai.request(app)
            .get('/health')
            .then(res => {
                res.should.have.status(200)
                res.body.should.have.property('health');
                res.body.health.should.be.eq('Ok');
            })
            .catch(err => {
                throw err
            })
    })

    it('GET no existing resource (404)', () => {
        return chai.request(app)
            .get('/fake')
            .then(res => {
                res.should.have.status(404)
            })
            .catch(err => {
                throw err
            })
    })

})