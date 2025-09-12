import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const reqToken = req.headers.authorization;

  if (!reqToken) return res.status(401).json({ error: `Access denied` });
  try {
    let token = reqToken.split(" ")[1];
    console.log({ token });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log({ decoded });
    
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(401).json({ error: "Invalid token" });
  }
};

export default auth;
