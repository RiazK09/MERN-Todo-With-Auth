const jwt = require("jsonwebtoken");

/* As a safety net, I have set the token to expire in 30 days. */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
