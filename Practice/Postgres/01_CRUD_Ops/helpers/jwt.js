import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dakshKaSecretHae";

// Generates a JWT token for user
export const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "1h" });
};

// Middleware to verify JWT token for api's
export const verifyToken = (req, res, next) => {
  let token;
  // Support both Authorization header and cookies
  const authHeader = req.headers.authorization;

  // method1
  // if (authHeader && authHeader.startsWith("Bearer ")) {
  //   token = authHeader.split(" ")[1];
  // } else if (req.cookies && req.cookies.token) {
  //   token = req.cookies.token;
  // }

  // Method 2
  authHeader && authHeader.startsWith("Bearer ") ? token = authHeader.split("")[1] : token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
   } 
  //  catch (err) {
  //   return res.status(401).json({ message: "Invalid or expired token." });
  // }
  catch (err) {
      next(err)
    }
};
export default jwt;