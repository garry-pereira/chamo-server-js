// my global error handling middleware

const handleDNE = (err, req, res, next) => {
  const error = new Error(`[${req.originalUrl}] does not exist`)
  res.status(404)
  next(error)

  // here i'm using res.status, but this does not send the response
  // so i call next() to pass the error on to the next middleware function (which is probably handleError)
}

const handleError = (err, req, res, next) => {
  let code = res.statusCode === 200 ? 500 : res.statusCode
  let message = err.message

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    code = 404
    message = 'Resource not found'
  }

  res.status(code).json({
    status: 'error',
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })

  // next is not called here because this is the last middleware that runs in this chain
  // because we use res.json() the response is sent, ending the request-response cycle (finishing it)
}

export { handleDNE, handleError }
