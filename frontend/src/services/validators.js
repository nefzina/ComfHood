const validateEmail = (email) => {
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!email) {
    return "Email is required !";
  } else if (!regex.test(email)) {
    return "Email is invalid !";
  }
};

const validateName = (name, fieldName) => {
  const regex = /^[a-zA-Z]{2,60}$/;
  if (!name) {
    return `${fieldName} is required !`;
  } else if (name.length < 2) {
    return `${fieldName} is too short !`;
  } else if (!regex.test(name)) {
    return `${fieldName} is invalid !`;
  }
};

const validatePassword = (pw) => {
  const regex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*€])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*€]{8,16}$/;
  if (!pw) {
    return `Password is required !`;
  } else if (!regex.test(pw)) {
    return `Password is invalid !`;
  }
};

export { validateEmail, validateName, validatePassword };
