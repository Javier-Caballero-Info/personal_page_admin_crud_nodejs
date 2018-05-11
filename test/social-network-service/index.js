// test/registration.spec.js
const chai = require('chai')
const chaiHttp = require('chai-http')


let app = require('../../src/index')

chai.should()
chai.use(chaiHttp)

describe('Social Network Service', () => {

    const lang = 'es'

    const fake_lang = 'asd'

    const base_path = '/' + lang + '/social-networks'

    const fake_base_path = '/' + fake_lang + '/social-networks'

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
            .get(base_path)
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
            .post(base_path)
            .send(EXAMPLE_POST_DATA)
            .then(res => {
                res.should.have.status(201)
                food_id = res.body.data.id
            })
    })

    it('GET Social Networks (200,length==1)', () => {
        return chai.request(app)
            .get(base_path)
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
            .post(base_path)
            .send({})
            .then(res => {
                res.should.have.status(400)
            })
    })

    it('GET a Social Network (200)', () => {
        return chai.request(app)
            .get(base_path + '/' +food_id)
            .send()
            .then(res => {
                res.should.have.status(200)
            })
    })

    it('PUT a Social Network (200)', () => {
        return chai.request(app)
            .put(base_path + '/' +food_id)
            .send(EXAMPLE_PUT_DATA)
            .then(res => {
                res.should.have.status(200)
            })
    })

    it('PUT a Social Network (404)', () => {
        return chai.request(app)
            .put(base_path + '/not_found')
            .send(EXAMPLE_PUT_DATA)
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('PUT a Social Network (400)', () => {
        return chai.request(app)
            .put(base_path + '/' +food_id)
            .send({})
            .then(res => {
                res.should.have.status(400)
            })
    })

    it('DELETE a Social Network (200)', () => {
        return chai.request(app)
            .delete(base_path + '/' +food_id)
            .send()
            .then(res => {
                res.should.have.status(200)
            })
    })

    it('DELETE a Social Network (404)', () => {
        return chai.request(app)
            .delete(base_path + '/not_found')
            .send()
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('GET a Social Network (404)', () => {
        return chai.request(app)
            .get(base_path + '/' +food_id)
            .send()
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('GET a Social Network (404)', () => {
        return chai.request(app)
            .get(base_path + '/fake')
            .send()
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('GET Social Networks lang not supported', () => {

        return chai.request(app)
            .get(fake_base_path)
            .then(res => {
                res.should.have.status(400)
            })
            .catch(err => {
                throw err
            })
    })

    it('GET Social Network lang not supported', () => {

        return chai.request(app)
            .get(fake_base_path + '/fake_id')
            .then(res => {
                res.should.have.status(400)
            })
            .catch(err => {
                throw err
            })
    })

    it('POST Social Network lang not supported', () => {

        return chai.request(app)
            .post(fake_base_path, {})
            .then(res => {
                res.should.have.status(400)
            })
            .catch(err => {
                throw err
            })
    })

    it('PUT Social Network lang not supported', () => {

        return chai.request(app)
            .put(fake_base_path + '/fake_id', {})
            .then(res => {
                res.should.have.status(400)
            })
            .catch(err => {
                throw err
            })
    })

    it('DELETE Social Network lang not supported', () => {

        return chai.request(app)
            .delete(fake_base_path + '/fake_id')
            .then(res => {
                res.should.have.status(400)
            })
            .catch(err => {
                throw err
            })
    })

})