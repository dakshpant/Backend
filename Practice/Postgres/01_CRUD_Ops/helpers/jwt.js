import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dakshKaSecretHae";

// Generate a JWT token for a user
export const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "1h" });
};

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  let token;
  // Support both Authorization header and cookies
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};



export default jwt;
