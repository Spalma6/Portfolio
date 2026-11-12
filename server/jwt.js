import jwt from "jsonwebtoken";
import config from "../config/config.js";

const generateToken = (user) => {
  if (!config.jwtSecret) {
    throw new Error("JWT_SECRET must be configured.");
  }

  return jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    },
    config.jwtSecret,
    { expiresIn: "30d" },
  );
};

export default generateToken;