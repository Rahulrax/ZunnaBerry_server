// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");

// Middleware is a function that has access to the request (req), response (res),
// and the next function in the request-response cycle.
module.exports = function (req, res, next) {
  // 1. Get the token from the 'x-auth-token' header of the request.
  // This is a common convention for sending JWTs.
  const token = req.header("x-auth-token");

  // 2. Check if a token doesn't exist.
  if (!token) {
    // If there's no token, deny access with a 401 "Unauthorized" status.
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // 3. If a token exists, try to verify it.
  try {
    // jwt.verify() decodes the token using your secret key.
    // If the token is invalid or expired, it will throw an error.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. If verification is successful, attach the user's info to the request object.
    // The 'decoded' object contains the payload we created during login (e.g., user.id).
    req.user = decoded.user;

    // 5. Call next() to pass control to the next function in the chain (the controller).
    next();
  } catch (err) {
    // If verification fails, deny access.
    res.status(401).json({ msg: "Token is not valid" });
  }
};
