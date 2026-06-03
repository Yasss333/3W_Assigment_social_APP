import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const jwtmiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    console.log("  [JWT] Token:", !!token);
    
    if (!token) {
      return res.status(401).json({message: "Please login"});
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("  [JWT] User:", decoded.username);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("  [JWT] Error:", error.message);
    return res.status(401).json({message: "Token expired"});
  }
}