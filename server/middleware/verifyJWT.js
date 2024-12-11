import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer")) {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized: Bearer token required",
    });
  }

  try {
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized: Token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded) {
      return res.status(403).json({
        status: "error",
        message: "Forbidden: Invalid token structure",
      });
    }

    // Zugriff auf die verschachtelte Struktur
    req.user = decoded.userinfo.username;
    req.roles = decoded.userinfo.roles;
    req.userId = decoded.userinfo.userId;
    next();
  } catch (err) {
    return res.status(403).json({
      status: "error",
      message: "Forbidden: " + (err.message || "Invalid token"),
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};
