process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../app.js');
const conn = require('../../../db/index.js');

describe('POST /notes', () => {
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

  it('OK, creating a new note works', (done) => {
    request(app).post('/notes')
      .send({ name: 'NOTE', text: "AAA" })
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property('_id');
        expect(body).to.contain.property('name');
        expect(body).to.contain.property('text');
        done();
      })
      .catch((err) => done(err));
  });

  it('Fail, note requires text', (done) => {
    request(app).post('/notes')
      .send({ name: 'NOTE' })
      .then((res) => {
        const body = res.body;
        expect(body.errors.text.name)
          .to.equal('ValidatorError')
        done();
      })
      .catch((err) => done(err));
  });
})
