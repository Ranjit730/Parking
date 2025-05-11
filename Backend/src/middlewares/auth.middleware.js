import jwt from "jsonwebtoken";

export const ensureAuthenticated = (req, res, next) => {
  let authHeader = req.headers['authorization'];

  // Check if the Authorization header is present
  if (!authHeader) {
    return res
      .status(403)
      .json({ message: "Unauthorized: JWT is required", success: false });
  }

  // Extract the token (in case it's in the format "Bearer <token>")
  let token = authHeader.split(" ")[1]; // if it's "Bearer xyz", take "xyz"
  if (!token) {
    return res
      .status(403)
      .json({ message: "Unauthorized: Token missing", success: false });
  }

  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // Don't forget to call next() to move to the next middleware or route
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid or expired token", success: false });
  }
};
