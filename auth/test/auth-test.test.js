
const chai = require('chai');
const chaiHttp = require('chai-http');
const usersController = require('../users.controller');
const app = require('../../app').app;

chai.use(chaiHttp);

before((done) => {
    usersController.registerUser('bettatech', '1234');
    usersController.registerUser('mastermind', '4321');
    usersController.registerUser('portly', '1208');
    done()
});

describe('Suite de pruebas auth', () => {
    it('should return 401 when no jwt token available', (done) => {
        // when the call is not the correct key
        chai.request(app)
            .get('/teams')
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 401);
                done();
            });
    });

    it('should return 400 whtn no data is provided', (done) => {
        chai.request(app)
            .post('/auth/login')
            .end((err, res) => {
                // Expect valid login
                chai.assert.equal(res.statusCode, 400);
                done();
            });
    });

    it('should return 200 and token for successful login', (done) => {
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'portly', password: '1208'})
            .end((err, res) => {
                // Expect valid login
                chai.assert.equal(res.statusCode, 200);
                done();
            });
    });

    it('should return 200 when jwt is valid', (done) => {
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'portly', password: '1208'})
            .end((err, res) => {
                // Expect valid login
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .get('/teams')
                    .set('Authorization', `JWT ${res.body.token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200);
                        done();
                    });
            });
            
    });
    
});

after((done) => {
    usersController.cleanUpUsers();
    done();
});
