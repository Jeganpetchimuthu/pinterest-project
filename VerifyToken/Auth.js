const jwt = require("jsonwebtoken");

generateToken = (user) => jwt.sign({ id: user.id }, process.env.SECRET_KEY);

module.exports = generateToken;
