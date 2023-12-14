const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "ini_JWT_loh";

exports.validateToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    res.status(403).json({
      ok: false,
      message: `Token not found, ${String(err)}`,
    });
    return;
  }

  try {
    token = token.split(" ")[1];
    if (!token) {
      res.status(401).json({
        ok: false,
        message: `Token not found, ${String(err)}`,
      });
      return;
    }

    const payload = jwt.verify(token, JWT_SECRET_KEY);
    if (!payload) {
      res.status(401).json({
        ok: false,
        message: `Token not found, ${String(err)}`,
      });
      return;
    }

    req.user = payload;
    next();
  } catch (err) {
    res.status(403).json({
      ok: false,
      message: String(err),
    });
  }
};

exports.checkUser = (req, res, next) => {
  if (req.user.role !== "user") {
    res.status(403).json({
      ok: false,
      message: "You are not authorized. Only users can access this resource.",
    });
    return;
  }
  next();
};

exports.checkTenant = (req, res, next) => {
  if (req.user.role !== "tenant") {
    res.status(403).json({
      ok: false,
      message: "You are not authorized. Only tenants can access this resource.",
    });
    return;
  }
  next();
};
