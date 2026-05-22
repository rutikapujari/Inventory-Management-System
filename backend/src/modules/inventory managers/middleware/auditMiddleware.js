const auditMiddleware = (req, res, next) => {

  console.log("Audit Log");

  console.log("User:", req.user);

  console.log("Action Time:", new Date());

  console.log("Request Body:", req.body);

  next();
};

module.exports = auditMiddleware;