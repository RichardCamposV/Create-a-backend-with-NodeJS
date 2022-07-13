
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app').app;

describe('Suite de pruebas auth', () => {
    it('should return 401 when no jwt token available', (done) => {
        // when the call is not the correct key
        chai.request(app)
            .get('/team')
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 401);
                done();
            });
    });
    it('should return 200 when jwt is valid', (done) => {
        // First logged the user
        chai.request(app)
            .post('/login')
            .end((err, res) => {
                chai.request(app)
                    .get('/team')
                    .set('Autorization', `JWT ${res.body.token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200);
                        done();
                    });
            });
            
    });
    
});
