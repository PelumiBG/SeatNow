export const adminOnly = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        status: false,
        message: "User not authenticated",
      });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({
        status: false,
        message: "Not Authorized",
      });
    }

    next();
  } catch (err) {
    console.error("Error checking role:", err);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};