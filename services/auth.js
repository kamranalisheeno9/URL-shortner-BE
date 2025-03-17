const jwt = require("jsonwebtoken");

const setJwtForLogin = (user, secret) => {
  console.log("user", user);
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.firstName,
    },
    secret,
    { expiresIn: 60 * 60 }
  );
  return token;
};

module.exports = {
  setJwtForLogin,
};
