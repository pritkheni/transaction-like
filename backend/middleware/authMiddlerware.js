const { verifyToken } = require("../token/jwtToken");

exports.authJwtToken = (req, res, next) => {
  console.log(req.headers);
  // if (!req.hasOwnProperty("authorization")) {
  //   return res.status(403).json({
  //     success: false,
  //     message: "Please pass authentication token",
  //     date: {},
  //   });
  // }
  const reqtoken = req.headers["authorization"];
  console.log(reqtoken);
  if (!reqtoken) {
    return res.status(403).json({
      success: false,
      message: "Please pass vlaid token",
      date: {},
    });
  }
  const token = reqtoken.split(" ")[1];
  const verifyPaylod = verifyToken(token);
  console.log(verifyPaylod);
  if (!verifyPaylod) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      date: {},
    });
  }
  req.userId = verifyPaylod.userId;
  next();
};
