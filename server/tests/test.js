const describe = require('mocha').describe;
const assert = require('chai').assert;
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('Test user registration and login', () => {

    //assign stub data
    const testUserData = {
        "username": `testUser${Math.floor(Math.random()*(999-100+1)+100)}`,
        "password": `testPassword${Math.floor(Math.random()*(999-100+1)+100)}`,
    };

    it('shouldRegisterUser_returns200', (done) => {
        //register test user
        chai.request(server)
            .post('/api/user/signup') //should be in config file
            .send(testUserData)
            .end((error, res) => {
                assert.equal(res.status, 200);
                done();
            })
    });

    it('shouldLoginUser_returns200', (done) => {
        //login test user
        chai.request(server)
            .post('/api/user/login') //should be in config file
            .send(testUserData)
            .end((error, res) => {
                assert.equal(res.status, 200);
                done();
            });
    });

    it('shouldLoginUser_returns401', (done) => {
        const wrongTestData = {
            "username": `wrongUser${Math.floor(Math.random()*(999-100+1)+100)}`,
            "password": `wrongPassword${Math.floor(Math.random()*(999-100+1)+100)}`,
        };
        //login test user
        chai.request(server)
            .post('/api/user/login') //should be in config file
            .send(wrongTestData)
            .end((error, res) => {
                assert.equal(res.status, 401);
                done();
            });
    });

});
