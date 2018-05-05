// test/registration.spec.js
const chai = require('chai')
const chaiHttp = require('chai-http')


let app = require('../../src/index')

chai.should()
chai.use(chaiHttp)

describe('Food Service', () => {

    let food_id

    it('GET Foods (200,length==0)', () => {
        return chai.request(app)
            .get('/foods')
            .then(res => {
                res.should.have.status(200)
            })
            .catch(err => {
                throw err
            })
    })

    it('POST food (201)', () => {
        return chai.request(app)
            .post('/foods')
            .send({
                name: 'lemonpie'
            })
            .then(res => {
                res.should.have.status(201)
                food_id = res.body.data.id
            })
    })

    it('POST food (400)', () => {
        return chai.request(app)
            .post('/foods')
            .send({})
            .then(res => {
                res.should.have.status(400)
            })
    })

    it('GET a food (200)', () => {
        return chai.request(app)
            .get('/foods/' + food_id)
            .send()
            .then(res => {
                res.should.have.status(200)
            })
    })

    it('PUT a food (200)', () => {
        return chai.request(app)
            .put('/foods/' + food_id)
            .send({
                name: 'applepie'
            })
            .then(res => {
                res.should.have.status(200)
            })
    })

    it('PUT a food (404)', () => {
        return chai.request(app)
            .put('/foods/not_found')
            .send({
                name: 'applepie'
            })
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('PUT a food (400)', () => {
        return chai.request(app)
            .put('/foods/' + food_id)
            .send({})
            .then(res => {
                res.should.have.status(400)
            })
    })

    it('DELETE a food (200)', () => {
        return chai.request(app)
            .delete('/foods/' + food_id)
            .send()
            .then(res => {
                res.should.have.status(200)
            })
    })

    it('DELETE a food (404)', () => {
        return chai.request(app)
            .delete('/foods/not_found')
            .send()
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('GET a food (404)', () => {
        return chai.request(app)
            .get('/foods/' + food_id)
            .send()
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('GET a food (404)', () => {
        return chai.request(app)
            .get('/foods/fake')
            .send()
            .then(res => {
                res.should.have.status(404)
            })
    })

})