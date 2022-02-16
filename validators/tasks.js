const Joi = require("joi");

const postValidator = (data) => {
  const postValidationSchema = Joi.object({
    user_id: Joi.string().required(),
    post_title: Joi.string().min(6).required(),
    post_description: Joi.string().min(10).required(),
  });

  return postValidationSchema.validate(data);
};
module.exports = {
  postValidator,
};
