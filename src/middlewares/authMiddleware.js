import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Middleware to protect routes
export const protectUser = async (req, res, next) => {
  let token;

  try {
    // Check Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by the ID in the token
      const user = await User.findOne({
        where: { userId: decoded.userId },
      });

      if (!user) {
        return res
          .status(401)
          .json({ status: false, message: "User account not found" });
      }

      req.user = user;
      return next();  
    }

    // NO TOKEN FOUND
    return res
      .status(401)
      .json({ status: false, message: "Token not detected" });

  } catch (err) {
    console.error("JWT Error:", err.message);

    return res
      .status(401)
      .json({ status: false, message: "Not authorized, invalid token" });
  }
};
