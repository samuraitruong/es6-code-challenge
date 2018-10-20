import 'mocha';
import chai, {
  expect,
} from 'chai';
import sinonChai from 'sinon-chai';
import {
  mockReq,
  mockRes,
} from 'sinon-express-mock';
import sinon from 'sinon';
chai.use(sinonChai);

import BookController from '../../controller/book-controller';
import {
  BookRepository,
} from '../../db';
describe('BookController test', () => {
  it('post() should success with 200 when data valid', async () => {
    const clientId = 'test';
    const request = {
      headers: {
        authorization: clientId,
      },
      body: {
        title: 'book',
        author: 'test',
        pages: 11,
        year: 2018,
      },
    };
    const next = sinon.spy((err) => {});
    const req = mockReq(request);
    const res = mockRes();
    const bookController = new BookController(null);

    await bookController.post(req, res, next);
    expect(res.statusCode).to.be.eq(200);
    expect(res.json).to.be.calledWithMatch({
      payload: {
        author: 'test',
        id: 1,
        pages: 11,
        title: 'book',
        year: 2018,

      },
    });
  });

  it('post() should failed with 400 when missing title in payload', async () => {
    const clientId = 'test';
    const request = {
      headers: {
        authorization: clientId,
      },
      body: {
        author: 'test',
        pages: 11,
        year: 2018,
      },
    };
    const next = sinon.spy((err) => {});
    const req = mockReq(request);
    const res = mockRes();
    const bookController = new BookController(null);

    await bookController.post(req, res, next);
    expect(res.statusCode).to.be.eq(400);
    expect(res.json).to.be.calledWithMatch({
      error: {
        message: 'title and author is required field',
      },
      payload: {
        author: 'test',
        title: undefined,
      },
    });
  });
  it('post() should failed with internal error when the db error', async () => {
    const clientId = 'test';
    const request = {
      headers: {
        authorization: clientId,
      },
      body: {
        author: 'test',
        title: 'test',
      },
    };
    const next = sinon.spy((err) => {});
    const req = mockReq(request);
    const res = mockRes();
    const repo = new BookRepository();
    sinon.stub(repo, 'addItem').throwsException('Internal Error');
    const bookController = new BookController(repo);

    await bookController.post(req, res, next);
    expect(res.statusCode).to.be.eq(500);
    expect(res.json).to.be.calledWithMatch({
      error: {
        message: 'Unknow Error',
      },
      payload: 'Internal Error',
    });
  });
});
