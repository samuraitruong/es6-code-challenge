export function response(res, statusCode, err, payload) {
  res.statusCode = statusCode;
  if (err) {
    res.json({
      payload,
      error: {
        message: err.message || 'Unknow Error',
      },
    });
  } else {
    res.json({
      payload,
    });
  }
}
export function success(res, payload) {
  response(res, 200, null, payload);
}
export function notFound(res, message, payload) {
  message = message || 'Resource not found or deleted';
  response(res, 404, {
    message,
  }, payload);
}
export function internalError(res, err) {
  response(res, 500, err, 'Internal Error');
}
export function badRequest(res, message, payload) {
  response(res, 400, {
    message,
  }, payload);
}
