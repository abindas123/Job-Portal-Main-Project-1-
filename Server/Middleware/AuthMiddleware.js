import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  console.log("AUTH HEADER:", req.headers.authorization);
console.log("DECODED USER:", req.user);
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.UserId,   // ✔ FIXED
      role: decoded.role,
    };

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user?.role) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }

    return next();
  };
};