const Joi = require("joi");

const registerValidator = (data) => {
  const userValidationSchema = Joi.object({
    username: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(6).max(225).email().required(),
    password: Joi.string()
      .min(6)
      .max(1024)
      .required()
      .regex(/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{6,1024}$/),
  });

  return userValidationSchema.validate(data);
};

const loginValidator = (data) => {
  const userValidationSchema = Joi.object({
    email: Joi.string().min(6).max(225).email().required(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return userValidationSchema.validate(data);
};

module.exports = {
  registerValidator,
  loginValidator,
};
