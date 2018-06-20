
const chai = require('chai')
const chaiHttp = require('chai-http')


let app = require('../src/index')

chai.should()
chai.use(chaiHttp)
let expect = chai.expect;

describe('Check New Relic', () => {

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

})