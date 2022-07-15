
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app').app;

describe('Suite de pruebas teams', () => {
    it('should return the team of the given user', (done) => {
        // when the call is not the correct key
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
                        // Have a team with Charizard and Blastoise
                        // {trainer: 'portly', team: [Pokemon]}
                        chai.assert.equal(res.statusCode, 200);
                        chai.assert.equal(res.body.trainer, 'portly');
                        chai.assert.equal(res.body.team.length, 2);
                        chai.assert.equal(res.body.team[0].name, 'Charizard');
                        chai.assert.equal(res.body.team[1].name, 'Blastoise');
                        done();
                    });
            });
    });
});
