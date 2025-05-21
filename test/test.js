const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../server.js');
const db = require('../index.js');
require('dotenv').config();

const PORT = process.env.PORT;
const locaHost = `http://localhost:${PORT}`

const expect = chai.expect;
chai.use(chaiHttp);

describe('POST /api with no params', () => {
  let request;

  before(async () => {
    await db.migrate
      .forceFreeMigrationsLock()
      .then(() => db.migrate.rollback({ all: true }))
      .then(() => db.migrate.latest())
      .then(() => db.seed.run())
      .catch(console.error);

    request = chai.request(app).keepOpen();
  });

  after(() => {
    request.close();
  });

  it('should return status 200.', async () => {
    const response = await fetch(`${locaHost}/api`, {
      method: 'GET',
    });
    expect(response).to.have.status(200);
  });
});
