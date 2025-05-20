import chai from 'chai';
import chaiHttp from 'chai-http';
// import db from '../src/knex.js';

const expect = chai.expect;
chai.use(chaiHttp);

describe('GET /api/authors/ with no params', () => {
  let request;

  before(async () => {

  });

  after(() => {

  });

  it('should return status 200.', async () => {
    const response = await request.get('/api/authors/');
    expect(response).to.have.status(200);
  });
});