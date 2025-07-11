const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.JWT_SECRET_KEY;

// create a JSON web token
function createToken(payload) {
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
  return token;
}

// verify the JSON web token
function verifyToken(token) {
  jwt.verify(token, secretkey, (err, decoded) => {
    if (err) {
      console.log("Token is invalid");
    } else {
      console.log("Decoded Token:", decoded);
    }
  });

  console.log(token);
}

module.exports = { createToken, verifyToken };
