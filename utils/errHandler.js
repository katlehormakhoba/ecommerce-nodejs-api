const { resFail } = require("./responseHandler");

//ADD CODE AND STATUS TO ERROR
const newError = (msg) => {
  const e = new Error(msg);
  e.statusCode = 400;
  e.status = "fail";
  return e;
};

const modelErrHandle = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data : ${errors.join(", ")}`;

  return newError(message);
};

const handleDublicateEntry = (err) => {
  const message = err.parent.sqlMessage;
  // console.log(message)
  return newError(message);
};

const handleUnknownID = (err) => {
  // console.log('Okwenzeke:', err.fields)

  const message = `ID does not exist  ${err.fields.join(", ")}`;
  // console.log(message)
  return newError(message);
};

// const errResponseHandler = (e, res) => {
//   const message = e.message;
//   res.status(e.statusCode).json({
//     status: e.status,
//     message,
//   });
// };

const errHandler = (err, req, res, next) => {
  console.log(err);
  // const e = err;
  const code =
    typeof err.parent == "object" && err.parent && "errno" in err.parent
      ? err.parent.errno
      : 0;

  if (code == 1062) err = handleDublicateEntry(err);
  if (code == 1452) err = handleUnknownID(err);
  if (err.errors) err = modelErrHandle(err);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  err.message = err.message || "Ooops something went wrong";

  // errResponseHandler(err, res);
  resFail(err, res);
};

module.exports = errHandler;
