import { RequestHandler, ErrorRequestHandler } from "express";

/*
  This middleware simply wraps the whole handler with a promise.
  Thanks to this, if a promise is rejected somewhere in the call stack,
  we will catch it and pass it to express error middleware.
  */
export const asyncErrorHandler =
  (fn: RequestHandler): RequestHandler =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch((error) => next(error));

export default (): ErrorRequestHandler => (err, req, res) => {
  console.error(err);

  // we only return the reason in dev
  if (req.app.get("env") === "development") {
    return res.status(err.status || 500).json({ message: err.message, name: err.code });
  }

  return res.sendStatus(err.status || 500).json({ name: err.code });
};

process.on("unhandledRejection", (reason: Error, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
  throw reason;
});

process.on("uncaughtException", (error) => {
  console.error("uncaughtException", error);
});
