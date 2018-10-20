import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import validateTokenMiddleware from './middleware/token-middleware';
import apiRoute from './route';
import config from './config';
import logger from './common/logger';
const app = express();
app.server = http.createServer(app);

app.use(morgan('combined', {
  stream: logger.stream,
}));

// 3rd party middleware
app.use(cors({
  exposedHeaders: config.corsHeaders,
}));

app.use(bodyParser.json({
  limit: config.bodyLimit,
}));

app.use(validateTokenMiddleware(config));
// api router
app.use('/api', apiRoute({
  config,
}));

app.server.listen(config.port, () => {
  logger.info(`Started on port ${app.server.address().port}`);
});

export default app;
