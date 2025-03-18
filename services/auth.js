const jwt = require("jsonwebtoken");

const setJWTAccessTokenForLogin = (user, secret) => {
  // console.log("user", user);
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.firstName,
    },
    secret,
    { expiresIn: "1m" }
  );
  return token;
};
const setJWTRefreshTokenForLogin = (user, secret) => {
  // console.log("user", user);
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.firstName,
    },
    secret,
    { expiresIn: "7d" }
  );
  return token;
};

module.exports = {
  setJWTAccessTokenForLogin,
  setJWTRefreshTokenForLogin,
};
