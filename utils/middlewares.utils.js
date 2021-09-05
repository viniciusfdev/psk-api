export function errorMiddleware(err, req, res, next) {
  console.log(err);

  res.status(500).json({
    message: err?.message,
    code: err?.code,
    detail: err?.stack,
  });
}

export function logMiddleware(req, res, next) {
  console.log(`[${req.method}] =>`, req.url);
  next();
}
