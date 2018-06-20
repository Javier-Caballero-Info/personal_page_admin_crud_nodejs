
const chai = require('chai')
const chaiHttp = require('chai-http')


let app = require('../../src/index')

chai.should()
chai.use(chaiHttp)

describe('Contact Service', () => {

    const lang = 'es'

    const fake_lang = 'asd'

    const base_path = '/' + lang + '/contacts'

    const fake_base_path = '/' + fake_lang + '/contacts'

    const authorizationToken = process.env.AUTH_TOKEN

    let contact_id

    const EXAMPLE_POST_DATA =  {
        "img": "img_path",
        "lang": "EN",
        "icon": "fa fa-whatsapp",
        "info": "algo",
        "name": "Whatsapp",
        "order": 1
    }

    const EXAMPLE_PUT_DATA =  {
        "img": "img_path",
        "lang": "EN",
        "icon": "fa fa-telegram",
        "info": "algo",
        "name": "Telegram",
        "order": 1
    }

    it('GET Contacts (200,length==0)', () => {

        return chai.request(app)
            .get(base_path)
            .set('Authorization', authorizationToken)
            .then(res => {
                res.should.have.status(200)
                res.body.data.should.have.length(0)
            })
            .catch(err => {
                throw err
            })
    })

    it('POST Contact (201)', () => {
        return chai.request(app)
            .post(base_path)
            .set('Authorization', authorizationToken)
            .send(EXAMPLE_POST_DATA)
            .then(res => {
                res.should.have.status(201)
                contact_id = res.body.data.id
            })
    })

    it('GET Contacts (200,length==1)', () => {
        return chai.request(app)
            .get(base_path)
            .set('Authorization', authorizationToken)
            .then(res => {
                res.should.have.status(200)
                res.body.data.should.have.length(1)
            })
            .catch(err => {
                throw err
            })
    })

    it('POST Contact (400)', () => {
        return chai.request(app)
            .post(base_path)
            .set('Authorization', authorizationToken)
            .send({})
            .then(res => {
                res.should.have.status(400)
            })
    })

    it('GET a Contact (200)', () => {
        return chai.request(app)
            .get(base_path + '/' +contact_id)
            .set('Authorization', authorizationToken)
            .send()
            .then(res => {
                res.should.have.status(200)
            })
    })

    it('PUT a Contact (200)', () => {
        return chai.request(app)
            .put(base_path + '/' +contact_id)
            .set('Authorization', authorizationToken)
            .send(EXAMPLE_PUT_DATA)
            .then(res => {
                res.should.have.status(200)
            })
    })

    it('PUT a Contact (404)', () => {
        return chai.request(app)
            .put(base_path + '/not_found')
            .set('Authorization', authorizationToken)
            .send(EXAMPLE_PUT_DATA)
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('PUT a Contact (400)', () => {
        return chai.request(app)
            .put(base_path + '/' +contact_id)
            .set('Authorization', authorizationToken)
            .send({})
            .then(res => {
                res.should.have.status(400)
            })
    })

    it('DELETE a Contact (204)', () => {
        return chai.request(app)
            .delete(base_path + '/' +contact_id)
            .set('Authorization', authorizationToken)
            .send()
            .then(res => {
                res.should.have.status(204)
            })
    })

    it('DELETE a Contact (404)', () => {
        return chai.request(app)
            .delete(base_path + '/not_found')
            .set('Authorization', authorizationToken)
            .send()
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('GET a Contact (404)', () => {
        return chai.request(app)
            .get(base_path + '/' +contact_id)
            .set('Authorization', authorizationToken)
            .send()
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('GET a Contact (404)', () => {
        return chai.request(app)
            .get(base_path + '/fake')
            .set('Authorization', authorizationToken)
            .send()
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('GET Contacts lang not supported', () => {

        return chai.request(app)
            .get(fake_base_path)
            .set('Authorization', authorizationToken)
            .then(res => {
                res.should.have.status(400)
            })
            .catch(err => {
                throw err
            })
    })

    it('GET Contact lang not supported', () => {

        return chai.request(app)
            .get(fake_base_path + '/fake_id')
            .set('Authorization', authorizationToken)
            .then(res => {
                res.should.have.status(400)
            })
            .catch(err => {
                throw err
            })
    })

    it('POST Contact lang not supported', () => {

        return chai.request(app)
            .post(fake_base_path, {})
            .set('Authorization', authorizationToken)
            .then(res => {
                res.should.have.status(400)
            })
            .catch(err => {
                throw err
            })
    })

    it('PUT Contact lang not supported', () => {

        return chai.request(app)
            .put(fake_base_path + '/fake_id', {})
            .set('Authorization', authorizationToken)
            .then(res => {
                res.should.have.status(400)
            })
            .catch(err => {
                throw err
            })
    })

    it('DELETE Contact lang not supported', () => {

        return chai.request(app)
            .delete(fake_base_path + '/fake_id')
            .set('Authorization', authorizationToken)
            .then(res => {
                res.should.have.status(400)
            })
            .catch(err => {
                throw err
            })
    })

})