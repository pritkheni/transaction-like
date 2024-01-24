const jwt = require("jsonwebtoken");
exports.getJwtToken = (payload) => {
  const key = process.env.SCRET_KEY;
  return jwt.sign(payload, key);
};

exports.verifyToken = (token) => {
  const key = process.env.SCRET_KEY;
  let paylod = null;
  try {
    paylod = jwt.verify(token, key);
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
  return paylod;
};
