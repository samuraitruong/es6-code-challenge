import {
  ClientRepository,
} from '../db';
import logger from '../common/logger';
/**
 * Custom applicaiton level midleware to validate token in query string or headers.
 * @param {*} config
 * @return {function} function to handle request
 */
// In real application, depend on the authentication modal, we use passport as the middleware to handle this.
export default function tokenAuthMiddleware(config) {
  return function(req, res, next) {
    try {
      let {
        authorization,
      } = req.headers || {};
      authorization = authorization || req.query.token;
      const client = authorization ? new ClientRepository(config).getClientById(authorization) : null;
      if (!authorization || !client) {
        res.json({
          message: 'Unauthorized',
        });
        next('Unauthorized');
      }
      // pass client to next handlers
      req.client = client;
      next();
    } catch (err) {
      logger.error('Token validation error ', err);
      next(err);
    };
  };
}
