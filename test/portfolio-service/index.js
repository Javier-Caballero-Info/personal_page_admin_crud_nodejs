
const chai = require('chai')
const chaiHttp = require('chai-http')


let app = require('../../src/index')

chai.should()
chai.use(chaiHttp)

describe('Portfolio Service', () => {

    const lang = 'es'

    const fake_lang = 'asd'

    const base_path = '/' + lang + '/portfolios'

    const fake_base_path = '/' + fake_lang + '/portfolios'

    const authorizationToken = process.env.AUTH_TOKEN

    let portfolio_id

    const EXAMPLE_POST_DATA =  {
        "name": "Facebook",
        "description": "",
        "resources": [
            {
                "name": "Html page",
                "description": "This a description",
                "technologies": [
                    "Html",
                    "JQuery"
                ],
                "links": [
                    {
                        "name": "link name",
                        "icon": "fa-github",
                        "link": "http://github.com/caballerojavier13"
                    }
                ]
            }
        ],
        "order": 1
    }

    const EXAMPLE_PUT_DATA =  {
        "name": "Personal Page",
        "description": "Esta es una descripción",
        "resources": [
            {
                "name": "Html page",
                "description": "This a description",
                "technologies": [
                    "Html",
                    "JQuery"
                ],
                "links": [
                    {
                        "name": "link name",
                        "icon": "fa-github",
                        "link": "http://github.com/caballerojavier13"
                    }
                ]
            }
        ],
        "order": 2
    }

    it('GET Portfolios (200,length==0)', () => {

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

    it('POST Portfolio (201)', () => {
        return chai.request(app)
            .post(base_path)
            .set('Authorization', authorizationToken)
            .send(EXAMPLE_POST_DATA)
            .then(res => {
                res.should.have.status(201)
                portfolio_id = res.body.data.id
            })
    })

    it('GET Portfolios (200,length==1)', () => {
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

    it('POST Portfolio (400)', () => {
        return chai.request(app)
            .post(base_path)
            .set('Authorization', authorizationToken)
            .send({})
            .then(res => {
                res.should.have.status(400)
            })
    })

    it('GET a Portfolio (200)', () => {
        return chai.request(app)
            .get(base_path + '/' +portfolio_id)
            .set('Authorization', authorizationToken)
            .send()
            .then(res => {
                res.should.have.status(200)
            })
    })

    it('PUT a Portfolio (200)', () => {
        return chai.request(app)
            .put(base_path + '/' +portfolio_id)
            .set('Authorization', authorizationToken)
            .send(EXAMPLE_PUT_DATA)
            .then(res => {
                res.should.have.status(200)
            })
    })

    it('PUT a Portfolio (404)', () => {
        return chai.request(app)
            .put(base_path + '/not_found')
            .set('Authorization', authorizationToken)
            .send(EXAMPLE_PUT_DATA)
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('PUT a Portfolio (400)', () => {
        return chai.request(app)
            .put(base_path + '/' +portfolio_id)
            .set('Authorization', authorizationToken)
            .send({})
            .then(res => {
                res.should.have.status(400)
            })
    })

    it('DELETE a Portfolio (204)', () => {
        return chai.request(app)
            .delete(base_path + '/' +portfolio_id)
            .set('Authorization', authorizationToken)
            .send()
            .then(res => {
                res.should.have.status(204)
            })
    })

    it('DELETE a Portfolio (404)', () => {
        return chai.request(app)
            .delete(base_path + '/not_found')
            .set('Authorization', authorizationToken)
            .send()
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('GET a Portfolio (404)', () => {
        return chai.request(app)
            .get(base_path + '/' +portfolio_id)
            .set('Authorization', authorizationToken)
            .send()
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('GET a Portfolio (404)', () => {
        return chai.request(app)
            .get(base_path + '/fake')
            .set('Authorization', authorizationToken)
            .send()
            .then(res => {
                res.should.have.status(404)
            })
    })

    it('GET Portfolios lang not supported', () => {

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

    it('GET Portfolio lang not supported', () => {

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

    it('POST Portfolio lang not supported', () => {

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

    it('PUT Portfolio lang not supported', () => {

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

    it('DELETE Portfolio lang not supported', () => {

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