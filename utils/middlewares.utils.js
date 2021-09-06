import * as jwt from "jsonwebtoken";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export function errorMiddleware(err, req, res, next) {
  console.log(err);

  res.status(500).json({
    message: err?.message,
    code: err?.code,
    detail: err?.stack,
  });
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export function logMiddleware(req, res, next) {
  console.log(`[${req.method}] =>`, req.url);
  next();
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export function authMiddleware(req, res, next) {
  const accessToken = req.cookies.accessToken;
  const descriptedToken = jwt.decode(accessToken);

  if (descriptedToken != null) {
    next();
  } else {
    res.status(401).send();
  }
}
