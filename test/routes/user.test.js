import chai from 'chai';
import chaiHttp from 'chai-http';
import { app, server } from '../../src/server';
let id = 0;
chai.should();
chai.use(chaiHttp);
describe('Testing API Routes /api/v1/users', () => {
    it('GET /', (done) => {
        chai.request(app)
            .get('/api/v1/users')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.eql({
                    success: true,
                    data: [],
                });
                done();
            });
    });
    it('POST /', (done) => {
        const user = {
            name: 'Cleison Melo',
            age: 39,
            email: 'cleison@gmail.com',
        };
        chai.request(app)
            .post('/api/v1/users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('data');
                id = res.body.data.id;
                done();
            });
    });
    it('POST / generate 400 bad request', (done) => {
        const user = null;
        chai.request(app)
            .post('/api/v1/users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(false);
                res.body.should.have
                    .property('msg')
                    .eql('Body request missing');
                done();
            });
    });
    it('GET /:id', (done) => {
        chai.request(app)
            .get('/api/v1/users/' + id)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('data');
                done();
            });
    });
    it('GET /:id generate 404 not found', (done) => {
        chai.request(app)
            .get('/api/v1/users/00000')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(false);
                res.body.should.have.property('msg').eql('Id 00000 not found');
                done();
            });
    });
    it('PUT /:id', (done) => {
        const user = {
            name: 'Cleison Ferreira Melo',
            age: 39,
            email: 'cleisonmelo@gmail.com',
        };
        chai.request(app)
            .put('/api/v1/users/' + id)
            .send(user)
            .end((err, res) => {
                res.should.have.status(202);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(true);
                res.body.should.have.property('data');
                done();
            });
    });
    it('PUT /:id generate 404 not found', (done) => {
        const user = {
            name: 'Cleison Ferreira Melo',
            age: 39,
            email: 'cleisonmelo@gmail.com',
        };
        chai.request(app)
            .put('/api/v1/users/00000')
            .send(user)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(false);
                res.body.should.have.property('msg').eql('Id 00000 not found');
                done();
            });
    });
    it('PUT /:id generate 400 bad request', (done) => {
        const user = null;
        chai.request(app)
            .put('/api/v1/users/' + id)
            .send(user)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(false);
                res.body.should.have
                    .property('msg')
                    .eql('Body request missing');
                done();
            });
    });
    it('DELETE /:id', (done) => {
        chai.request(app)
            .delete('/api/v1/users/' + id)
            .end((err, res) => {
                res.should.have.status(204);
                done();
            });
    });
    it('DELETE /:id generate 404 not found', (done) => {
        chai.request(app)
            .delete('/api/v1/users/00000')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql(false);
                res.body.should.have.property('msg').eql('Id 00000 not found');
                done();
            });
    });
    after(() => {
        server.close();
    });
});
