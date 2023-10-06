const Joi = require("joi");

const userSchema = Joi.object({
  firstname: Joi.string().max(255).required(),
  lastname: Joi.string().max(255).required(),
  email: Joi.string().email().max(255).required(),
  password: Joi.string()
    .pattern(
      /^(?=.*[0-9])(?=.*[!@#$%^&*€])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*€]{8,16}$/
    )
    .required(),
});

const validateUser = (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  const { error } = userSchema.validate(
    { firstname, lastname, email, password },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

const loginSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  password: Joi.string()
    .pattern(
      /^(?=.*[0-9])(?=.*[!@#$%^&*€])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*€]{8,16}$/
    )
    .required(),
});

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate(
    { email, password },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = {
  validateUser,
  validateLogin,
};
