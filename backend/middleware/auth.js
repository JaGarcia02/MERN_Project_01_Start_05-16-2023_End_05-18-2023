import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  let token = req.header("Authorization");
  try {
    if (!token) {
      return res.status(403).send("Access Denied.");
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next(0);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
