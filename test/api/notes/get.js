process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../app.js');
const conn = require('../../../db/index.js');

describe('GET /notes', () => {
  before((done) => {
    conn.connect()
      .then(() => done())
      .catch((err) => done(err));
  })

  after((done) => {
    conn.close()
      .then(() => done())
      .catch((err) => done(err));
  })

  it('OK, getting notes has no notes', (done) => {
    request(app).get('/notes')
      .then((res) => {
        const body = res.body;
        expect(body.length).to.equal(0);
        done();
      })
      .catch((err) => done(err));
  });

  it('OK, getting notes has 1 note', (done) => {
    request(app).post('/notes')
      .send({ name: 'NOTE TEST', text: 'BBB' })
      .then((res) => {
        request(app).get('/notes')
          .then((res) => {
            const body = res.body;
            expect(body.length).to.equal(1);
            done();
          })
      })
      .catch((err) => done(err));
  });
})
