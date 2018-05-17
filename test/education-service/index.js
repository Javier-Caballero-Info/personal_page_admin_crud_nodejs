
const chai = require('chai')
const chaiHttp = require('chai-http')


let app = require('../../src/index')

chai.should()
chai.use(chaiHttp)

describe('Education Service', () => {

    const lang = 'es'

    const fake_lang = 'asd'

    const base_path = '/' + lang + '/educations'

    const fake_base_path = '/' + fake_lang + '/educations'

    const authorizationToken = 'BEARER eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJ1c2lkIjoiQWxnbyJ9.i1ozPMRRfutuMDfJc6tZAIZlagHSy_IBtve0pg6xlGcFj7x6ebPxIivJpEqzdnB2'

    let education_id

    const EXAMPLE_POST_DATA =  {
        "career": "Clown",
        "detail": "Something",
        "institute": "UTN",
        "time": "May 2017 - April 2018",
        "lang": "EN",
        "order": 1
    }

    const EXAMPLE_PUT_DATA =  {
        "career": "Clown",
        "detail": "SomethingEdited",
        "institute": "UTN",
        "time": "June 2017 - April 2018",
        "lang": "EN",
        "order": 2
    }

    it('GET Educations (200,length==0)', () => {

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

    it('POST Education (201)', () => {
        return chai.request(app)
            .post(base_path)
            .set('authorization', authorizationToken)
            .send(EXAMPLE_POST_DATA)
            .then(res => {
                res.should.have.status(201)
                education_id = res.body.data.id
            })
    })

    it('GET Educations (200,length==1)', () => {
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

    it('POST Education (400)', () => {
        return chai.request(app)
            .post(base_path)
            .set('authorization', authorizationToken)
            .send({})
            .then(res => {
                res.should.have.status(400)
            })
    })

    it('GET a Education (200)', () => {
        return chai.request(app)
            .get(base_path + '/' +education_id)
            .set('authorization', authorizationToken)
            .send()
            .then(res => {
                res.should.have.status(200)
            })
    })

    it('PUT a Education (200)', () => {
        return chai.request(app)
            .put(base_path + '/' +education_id)
            .set('authorization', authorizationToken)
            .send(EXAMPLE_PUT_DATA)
            .then(res => {
                res.should.have.status(200)
            })
    })

    it('PUT a Education (404)', () => {
        return chai.request(app)
            .put(base_path + '/not_found')
            .set('authorization', authorizationToken)
            .send(EXAMPLE_PUT_DATA)
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('PUT a Education (400)', () => {
        return chai.request(app)
            .put(base_path + '/' +education_id)
            .set('authorization', authorizationToken)
            .send({})
            .then(res => {
                res.should.have.status(400)
            })
    })

    it('DELETE a Education (200)', () => {
        return chai.request(app)
            .delete(base_path + '/' +education_id)
            .set('authorization', authorizationToken)
            .send()
            .then(res => {
                res.should.have.status(200)
            })
    })

    it('DELETE a Education (404)', () => {
        return chai.request(app)
            .delete(base_path + '/not_found')
            .set('authorization', authorizationToken)
            .send()
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('GET a Education (404)', () => {
        return chai.request(app)
            .get(base_path + '/' +education_id)
            .set('authorization', authorizationToken)
            .send()
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('GET a Education (404)', () => {
        return chai.request(app)
            .get(base_path + '/fake')
            .set('authorization', authorizationToken)
            .send()
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('GET Educations lang not supported', () => {

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

    it('GET Education lang not supported', () => {

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

    it('POST Education lang not supported', () => {

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

    it('PUT Education lang not supported', () => {

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

    it('DELETE Education lang not supported', () => {

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