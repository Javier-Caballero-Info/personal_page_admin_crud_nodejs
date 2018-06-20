
const chai = require('chai')
const chaiHttp = require('chai-http')


let app = require('../../src/index')

chai.should()
chai.use(chaiHttp)

describe('Work Service', () => {

    const lang = 'es'

    const fake_lang = 'asd'

    const base_path = '/' + lang + '/works'

    const fake_base_path = '/' + fake_lang + '/works'

    const authorizationToken = process.env.AUTH_TOKEN

    let work_id

    const EXAMPLE_POST_DATA =  {
        "company": "AconcaguaSF",
        "description": "Something",
        "position": "QA",
        "time": "February 2014 - August 2017",
        "lang": "EN",
        "order": 2
    }

    const EXAMPLE_PUT_DATA =  {
        "company": "Globant",
        "description": "Something edited",
        "position": "Test Automation  Engineer",
        "time": "August 2017 - Now",
        "lang": "EN",
        "order": 1
    }

    it('GET Works (200,length==0)', () => {

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

    it('POST Work (201)', () => {
        return chai.request(app)
            .post(base_path)
            .set('Authorization', authorizationToken)
            .send(EXAMPLE_POST_DATA)
            .then(res => {
                res.should.have.status(201)
                work_id = res.body.data.id
            })
    })

    it('GET Works (200,length==1)', () => {
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

    it('POST Work (400)', () => {
        return chai.request(app)
            .post(base_path)
            .set('Authorization', authorizationToken)
            .send({})
            .then(res => {
                res.should.have.status(400)
            })
    })

    it('GET a Work (200)', () => {
        return chai.request(app)
            .get(base_path + '/' +work_id)
            .set('Authorization', authorizationToken)
            .send()
            .then(res => {
                res.should.have.status(200)
            })
    })

    it('PUT a Work (200)', () => {
        return chai.request(app)
            .put(base_path + '/' +work_id)
            .set('Authorization', authorizationToken)
            .send(EXAMPLE_PUT_DATA)
            .then(res => {
                res.should.have.status(200)
            })
    })

    it('PUT a Work (404)', () => {
        return chai.request(app)
            .put(base_path + '/not_found')
            .set('Authorization', authorizationToken)
            .send(EXAMPLE_PUT_DATA)
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('PUT a Work (400)', () => {
        return chai.request(app)
            .put(base_path + '/' +work_id)
            .set('Authorization', authorizationToken)
            .send({})
            .then(res => {
                res.should.have.status(400)
            })
    })

    it('DELETE a Work (204)', () => {
        return chai.request(app)
            .delete(base_path + '/' +work_id)
            .set('Authorization', authorizationToken)
            .send()
            .then(res => {
                res.should.have.status(204)
            })
    })

    it('DELETE a Work (404)', () => {
        return chai.request(app)
            .delete(base_path + '/not_found')
            .set('Authorization', authorizationToken)
            .send()
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('GET a Work (404)', () => {
        return chai.request(app)
            .get(base_path + '/' +work_id)
            .set('Authorization', authorizationToken)
            .send()
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('GET a Work (404)', () => {
        return chai.request(app)
            .get(base_path + '/fake')
            .set('Authorization', authorizationToken)
            .send()
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('GET Works lang not supported', () => {

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

    it('GET Work lang not supported', () => {

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

    it('POST Work lang not supported', () => {

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

    it('PUT Work lang not supported', () => {

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

    it('DELETE Work lang not supported', () => {

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