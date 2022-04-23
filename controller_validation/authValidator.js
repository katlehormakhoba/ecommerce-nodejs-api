const joi = require("joi");
let pass = false; // To toddle when of if password does not exist

const passwordCheck = (data) =>{
  if (data.password && !data.conPassword)
    return {
      value:data,
      error: {
        details: [
          {
            message: "Confirm Password is required",
          },
        ],
      },
    };

  // IF PASSWORD VALUE DOES NOT EXIST CREATE AND SET TO EMPTY STRING
  if (!data.password) {
    pass = true;
    data.password = "";
    return {
      value:data,
      error:{}
    }
  }

}

exports.regValidation = (data) => {
  
  // console.log("dataa ", data);
  if (data.password && !data.conPassword)
    return {
      value:data,
      error: {
        details: [
          {
            message: "Confirm Password is required",
          },
        ],
      },
    };

  // IF PASSWORD VALUE DOES NOT EXIST CREATE AND SET TO EMPTY STRING
  if (!data.password) {
    pass = true;
    data.password = data.password || "";
  }

  // let response = passwordCheck(data)
  // if(response.error) return response;
  // data = response.value;

  // console.log("data before", data);

  // console.log("next test", data.password);
  const schema = joi.object({
    name: joi.string().min(4).trim(),
    surname: joi.string().min(4).trim(),
    email: joi.string().min(6).email().trim(),
    password: joi.string().min(4).trim(),
    userType: joi.string(),
    conPassword: joi
      .string()
      .equal(data.password)
      .min(6)
      .messages({ "any.only": "Password does not match" })
      .trim(),
    phone: joi.string().min(10).max(10).trim(),
  });

  if (pass) {
    delete data.password;
  }

  // console.log("form validator", data);
  return schema.validate(data);
};
