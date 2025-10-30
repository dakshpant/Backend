const errorHandler = (err, req, res, next) => {
  console.error(`❌ [${req.method}] ${req.originalUrl} → ${err.statusCode || 500} | ${err.message}`);

  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorHandler;
