const Joi = require("joi");

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const { error } = Joi.object({
    email: Joi.string().email().max(255).required(),
  }).validate({ email }, { abortEarly: false });

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

const validateFirstname = (req, res, next) => {
  const { firstname } = req.body;
  const { error } = Joi.object({
    firstname: Joi.string().max(255).required(),
  }).validate({ firstname }, { abortEarly: false });

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

const validateLastname = (req, res, next) => {
  const { lastname } = req.body;
  const { error } = Joi.object({
    lastname: Joi.string().max(255).required(),
  }).validate({ lastname }, { abortEarly: false });

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  const { error } = Joi.object({
    password: Joi.string()
      .pattern(
        /^(?=.*[0-9])(?=.*[!@#$%^&*€])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*€]{8,16}$/
      )
      .required(),
  }).validate({ password }, { abortEarly: false });

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

const validateAddressId = (req, res, next) => {
  const addressId = req.body.address_id;
  const { error } = Joi.object({
    addressId: Joi.number().min(1).required(),
  }).validate({ addressId }, { abortEarly: false });

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = {
  validateEmail,
  validateFirstname,
  validateLastname,
  validatePassword,
  validateAddressId,
};
