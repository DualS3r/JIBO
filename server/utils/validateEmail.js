const validateEmail = (email) => {
  let res = false;

  if (
    email.indexOf("@") !== -1 &&
    email.indexOf(".", email.indexOf("@")) !== -1 &&
    email.indexOf("@") === email.lastIndexOf("@")
  ) {
    res = true;
  }

  return res;
};

module.exports = validateEmail;
