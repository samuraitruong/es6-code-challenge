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

import tokenAuthMiddleware from '../../middleware/token-middleware';
describe('tokenAuthMiddleware tests', () => {
  it('tokenAuthMiddleware should reject request missing token', () => {
    const request = {
      body: {
        title: 'book',
      },
    };
    const next = sinon.spy((err) => {});
    const req = mockReq(request);
    const res = mockRes();
    tokenAuthMiddleware({})(req, res, next);
    expect(res.json).to.be.calledWith({
      message: 'Unauthorized',
    });
    expect(next).to.be.calledWith('Unauthorized');
  });

  it('tokenAuthMiddleware should reject invalid token missing token', () => {
    const request = {
      headers: {
        'authorization': '123',
      },
      body: {
        title: 'book',
      },
    };
    const next = sinon.spy((err) => {});
    const req = mockReq(request);
    const res = mockRes();
    tokenAuthMiddleware({})(req, res, next);
    expect(res.json).to.be.calledWith({
      message: 'Unauthorized',
    });
    expect(next).to.be.calledWith('Unauthorized');
  });

  it('tokenAuthMiddleware should accept when token in header and match with client ID', () => {
    const clientId = 'UNIT TEST';

    const request = {
      headers: {
        'authorization': clientId,
      },
      body: {
        title: 'book',
      },
    };
    const next = sinon.spy((err) => {});
    const req = mockReq(request);
    const res = mockRes();
    tokenAuthMiddleware({
      clients: [{
        clientId,
      }],
    })(req, res, next);

    expect(next).to.be.calledWith();
    expect(req.client).to.deep.eq({
      clientId,
    });
  });
});
