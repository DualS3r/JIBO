const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json("No autorizado");
  }

  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json("No autorizado");
  }
  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json("No autorizado");
    }
    next();
  });
};

module.exports = verify;
