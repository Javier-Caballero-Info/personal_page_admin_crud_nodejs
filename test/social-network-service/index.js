// test/registration.spec.js
const chai = require('chai')
const chaiHttp = require('chai-http')


let app = require('../../src/index')

chai.should()
chai.use(chaiHttp)

describe('Social Network Service', () => {

    let food_id
    const EXAMPLE_POST_DATA =  {
        "img": "img_path",
        "lang": "EN",
        "link": "https://www.facebook.com/caballerojavier13",
        "name": "Facebook",
        "order": 1
    }
    const EXAMPLE_PUT_DATA =  {
        "img": "img_path2",
        "lang": "ES",
        "link": "https://twitter.com/J_H_Caballero_G",
        "name": "Twitter",
        "order": 2
    }

    it('GET Social Networks (200,length==0)', () => {
        return chai.request(app)
            .get('/social-networks')
            .then(res => {
                res.should.have.status(200)
                res.body.data.should.have.length(0)
            })
            .catch(err => {
                throw err
            })
    })

    it('POST Social Network (201)', () => {
        return chai.request(app)
            .post('/social-networks')
            .send(EXAMPLE_POST_DATA)
            .then(res => {
                res.should.have.status(201)
                food_id = res.body.data.id
            })
    })

    it('GET Social Networks (200,length==1)', () => {
        return chai.request(app)
            .get('/social-networks')
            .then(res => {
                res.should.have.status(200)
                res.body.data.should.have.length(1)
            })
            .catch(err => {
                throw err
            })
    })

    it('POST Social Network (400)', () => {
        return chai.request(app)
            .post('/social-networks')
            .send({})
            .then(res => {
                res.should.have.status(400)
            })
    })

    it('GET a Social Network (200)', () => {
        return chai.request(app)
            .get('/social-networks/' + food_id)
            .send()
            .then(res => {
                res.should.have.status(200)
            })
    })

    it('PUT a Social Network (200)', () => {
        return chai.request(app)
            .put('/social-networks/' + food_id)
            .send(EXAMPLE_PUT_DATA)
            .then(res => {
                res.should.have.status(200)
            })
    })

    it('PUT a Social Network (404)', () => {
        return chai.request(app)
            .put('/social-networks/not_found')
            .send(EXAMPLE_PUT_DATA)
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('PUT a Social Network (400)', () => {
        return chai.request(app)
            .put('/social-networks/' + food_id)
            .send({})
            .then(res => {
                res.should.have.status(400)
            })
    })

    it('DELETE a Social Network (200)', () => {
        return chai.request(app)
            .delete('/social-networks/' + food_id)
            .send()
            .then(res => {
                res.should.have.status(200)
            })
    })

    it('DELETE a Social Network (404)', () => {
        return chai.request(app)
            .delete('/social-networks/not_found')
            .send()
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('GET a Social Network (404)', () => {
        return chai.request(app)
            .get('/social-networks/' + food_id)
            .send()
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('GET a Social Network (404)', () => {
        return chai.request(app)
            .get('/social-networks/fake')
            .send()
            .then(res => {
                res.should.have.status(404)
            })
    })

})