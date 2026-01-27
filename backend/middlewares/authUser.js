import jwt from "jsonwebtoken";

// user authentication middleware
const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({ success: false, message: "Not Authorized, Login Again" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id || decoded.userId; // ⭐ important

    next();
  } catch (error) {
    res.json({ success: false, message: "Invalid Token" });
  }
};


export default authUser;
