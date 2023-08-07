const jwt = require("jsonwebtoken");
require("dotenv").config()

const generateToken = (userId, expires, type, secret = process.env.SECRET) => {
  const payload = {
    sub: userId,
    type: type,
    exp: expires,
    iat: Date.now() / 1000,
  };
  const jwtToken = jwt.sign(payload, secret);
  return jwtToken;
};

const generateAuthTokens = async (user) => {
  const expires = Math.floor(Date.now() / 1000) + process.env.ACCESSEXPIRATIONTIME * 60;
  const accessToken = generateToken(user.id, expires, process.env.TOKENTYPE)
  return {
    access: {
      token: accessToken,
      expires: new Date(expires * 1000)
    }
  }
}

module.exports = {
  generateToken,
  generateAuthTokens,
};