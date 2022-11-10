function errorHandle(error, request, response, next) {
  response.status(error.status || 500).json({
    success: false,
    message: error.message,
    name: error.name,
  });
}

export { errorHandle };
