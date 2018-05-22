
const chai = require('chai')
const chaiHttp = require('chai-http')


let app = require('../../src/index')

chai.should()
chai.use(chaiHttp)

describe('Scholastic Service', () => {

    const lang = 'es'

    const fake_lang = 'asd'

    const base_path = '/' + lang + '/scholastic'

    const fake_base_path = '/' + fake_lang + '/scholastic'

    const authorizationToken = 'BEARER eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJ1c2lkIjoiQWxnbyJ9.i1ozPMRRfutuMDfJc6tZAIZlagHSy_IBtve0pg6xlGcFj7x6ebPxIivJpEqzdnB2'

    let scholastic_id

    const EXAMPLE_POST_DATA =  {
        "institute": "Institute 1",
        "description": "Something",
        "subject": "Subject 1",
        "time": "February 2014 - August 2017",
        "lang": "EN",
        "order": 2
    }

    const EXAMPLE_PUT_DATA =  {
        "institute": "Institute 2",
        "description": "Something Edited",
        "subject": "Subject 2",
        "time": "August 2017 - Now",
        "lang": "EN",
        "order": 1
    }

    it('GET Scholastic (200,length==0)', () => {

        return chai.request(app)
            .get(base_path)
            .set('authorization', authorizationToken)
            .then(res => {
                res.should.have.status(200)
                res.body.data.should.have.length(0)
            })
            .catch(err => {
                throw err
            })
    })

    it('POST Scholastic (201)', () => {
        return chai.request(app)
            .post(base_path)
            .set('authorization', authorizationToken)
            .send(EXAMPLE_POST_DATA)
            .then(res => {
                res.should.have.status(201)
                scholastic_id = res.body.data.id
            })
    })

    it('GET Scholastic (200,length==1)', () => {
        return chai.request(app)
            .get(base_path)
            .set('authorization', authorizationToken)
            .then(res => {
                res.should.have.status(200)
                res.body.data.should.have.length(1)
            })
            .catch(err => {
                throw err
            })
    })

    it('POST Scholastic (400)', () => {
        return chai.request(app)
            .post(base_path)
            .set('authorization', authorizationToken)
            .send({})
            .then(res => {
                res.should.have.status(400)
            })
    })

    it('GET a Scholastic (200)', () => {
        return chai.request(app)
            .get(base_path + '/' +scholastic_id)
            .set('authorization', authorizationToken)
            .send()
            .then(res => {
                res.should.have.status(200)
            })
    })

    it('PUT a Scholastic (200)', () => {
        return chai.request(app)
            .put(base_path + '/' +scholastic_id)
            .set('authorization', authorizationToken)
            .send(EXAMPLE_PUT_DATA)
            .then(res => {
                res.should.have.status(200)
            })
    })

    it('PUT a Scholastic (404)', () => {
        return chai.request(app)
            .put(base_path + '/not_found')
            .set('authorization', authorizationToken)
            .send(EXAMPLE_PUT_DATA)
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('PUT a Scholastic (400)', () => {
        return chai.request(app)
            .put(base_path + '/' +scholastic_id)
            .set('authorization', authorizationToken)
            .send({})
            .then(res => {
                res.should.have.status(400)
            })
    })

    it('DELETE a Scholastic (200)', () => {
        return chai.request(app)
            .delete(base_path + '/' +scholastic_id)
            .set('authorization', authorizationToken)
            .send()
            .then(res => {
                res.should.have.status(200)
            })
    })

    it('DELETE a Scholastic (404)', () => {
        return chai.request(app)
            .delete(base_path + '/not_found')
            .set('authorization', authorizationToken)
            .send()
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('GET a Scholastic (404)', () => {
        return chai.request(app)
            .get(base_path + '/' +scholastic_id)
            .set('authorization', authorizationToken)
            .send()
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('GET a Scholastic (404)', () => {
        return chai.request(app)
            .get(base_path + '/fake')
            .set('authorization', authorizationToken)
            .send()
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('GET Scholastic lang not supported', () => {

        return chai.request(app)
            .get(fake_base_path)
            .set('authorization', authorizationToken)
            .then(res => {
                res.should.have.status(400)
            })
            .catch(err => {
                throw err
            })
    })

    it('GET Scholastic lang not supported', () => {

        return chai.request(app)
            .get(fake_base_path + '/fake_id')
            .set('authorization', authorizationToken)
            .then(res => {
                res.should.have.status(400)
            })
            .catch(err => {
                throw err
            })
    })

    it('POST Scholastic lang not supported', () => {

        return chai.request(app)
            .post(fake_base_path, {})
            .set('authorization', authorizationToken)
            .then(res => {
                res.should.have.status(400)
            })
            .catch(err => {
                throw err
            })
    })

    it('PUT Scholastic lang not supported', () => {

        return chai.request(app)
            .put(fake_base_path + '/fake_id', {})
            .set('authorization', authorizationToken)
            .then(res => {
                res.should.have.status(400)
            })
            .catch(err => {
                throw err
            })
    })

    it('DELETE Scholastic lang not supported', () => {

        return chai.request(app)
            .delete(fake_base_path + '/fake_id')
            .set('authorization', authorizationToken)
            .then(res => {
                res.should.have.status(400)
            })
            .catch(err => {
                throw err
            })
    })

})