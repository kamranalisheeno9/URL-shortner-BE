const jwt = require("jsonwebtoken");

const setJwtForLogin = (user, secret) => {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    secret,
    { expiresIn: 60 * 60 }
  );
  return token;
};

module.exports = {
  setJwtForLogin,
};
