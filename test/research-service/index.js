
const chai = require('chai')
const chaiHttp = require('chai-http')


let app = require('../../src/index')

chai.should()
chai.use(chaiHttp)

describe('Research Service', () => {

    const lang = 'es'

    const fake_lang = 'asd'

    const base_path = '/' + lang + '/researches'

    const fake_base_path = '/' + fake_lang + '/researches'

    const authorizationToken = 'BEARER eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJ1c2lkIjoiQWxnbyJ9.i1ozPMRRfutuMDfJc6tZAIZlagHSy_IBtve0pg6xlGcFj7x6ebPxIivJpEqzdnB2'

    let research_id

    const EXAMPLE_POST_DATA =  {
        "project": "Project 1",
        "description": "Something",
        "group": "Group 1",
        "time": "February 2014 - August 2017",
        "lang": "EN",
        "order": 2
    }

    const EXAMPLE_PUT_DATA =  {
        "project": "Project 1",
        "description": "Something",
        "group": "Group 1",
        "time": "August 2017 - Now",
        "lang": "EN",
        "order": 1
    }

    it('GET Researches (200,length==0)', () => {

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

    it('POST Research (201)', () => {
        return chai.request(app)
            .post(base_path)
            .set('authorization', authorizationToken)
            .send(EXAMPLE_POST_DATA)
            .then(res => {
                res.should.have.status(201)
                research_id = res.body.data.id
            })
    })

    it('GET Researches (200,length==1)', () => {
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

    it('POST Research (400)', () => {
        return chai.request(app)
            .post(base_path)
            .set('authorization', authorizationToken)
            .send({})
            .then(res => {
                res.should.have.status(400)
            })
    })

    it('GET a Research (200)', () => {
        return chai.request(app)
            .get(base_path + '/' +research_id)
            .set('authorization', authorizationToken)
            .send()
            .then(res => {
                res.should.have.status(200)
            })
    })

    it('PUT a Research (200)', () => {
        return chai.request(app)
            .put(base_path + '/' +research_id)
            .set('authorization', authorizationToken)
            .send(EXAMPLE_PUT_DATA)
            .then(res => {
                res.should.have.status(200)
            })
    })

    it('PUT a Research (404)', () => {
        return chai.request(app)
            .put(base_path + '/not_found')
            .set('authorization', authorizationToken)
            .send(EXAMPLE_PUT_DATA)
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('PUT a Research (400)', () => {
        return chai.request(app)
            .put(base_path + '/' +research_id)
            .set('authorization', authorizationToken)
            .send({})
            .then(res => {
                res.should.have.status(400)
            })
    })

    it('DELETE a Research (204)', () => {
        return chai.request(app)
            .delete(base_path + '/' +research_id)
            .set('authorization', authorizationToken)
            .send()
            .then(res => {
                res.should.have.status(204)
            })
    })

    it('DELETE a Research (404)', () => {
        return chai.request(app)
            .delete(base_path + '/not_found')
            .set('authorization', authorizationToken)
            .send()
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('GET a Research (404)', () => {
        return chai.request(app)
            .get(base_path + '/' +research_id)
            .set('authorization', authorizationToken)
            .send()
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('GET a Research (404)', () => {
        return chai.request(app)
            .get(base_path + '/fake')
            .set('authorization', authorizationToken)
            .send()
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('GET Researches lang not supported', () => {

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

    it('GET Research lang not supported', () => {

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

    it('POST Research lang not supported', () => {

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

    it('PUT Research lang not supported', () => {

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

    it('DELETE Research lang not supported', () => {

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