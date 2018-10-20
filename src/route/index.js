import {
  Router as router,
} from 'express';
import bookRoute from './book-route';

export default ({
  config,
}) => {
  const api = router();

  api.use('/book', bookRoute({
    config,
  }));

  api.get('/', (req, res) => {
    res.json({
      version: 1.0,
    });
  });

  return api;
};
