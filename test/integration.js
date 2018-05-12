const chai = require('chai')
const chaiHttp = require('chai-http')


let app = require('../src/index')

chai.should()
chai.use(chaiHttp)
let expect = chai.expect;

describe('Integration Tests', () => {

})