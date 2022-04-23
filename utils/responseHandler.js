exports.resSuccess = (res, code, data) => {
  res.status(code).json({
    status: "success",
    data,
  });
};

exports.resFail = (e, res) => {
  const message = e.message;
  res.status(e.statusCode).json({
    status: e.status,
    message,
  });
};
