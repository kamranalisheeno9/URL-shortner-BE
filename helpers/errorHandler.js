const errorHandler = (res, error) => {
  return res.status(500).json({
    message: "Internal server error",
    status: "Failed",
    error: error.message,
  });
};

module.exports = {
    errorHandler
}