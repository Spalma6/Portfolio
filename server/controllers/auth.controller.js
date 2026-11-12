import User from "../models/user.model.js";
import generateToken from "../jwt.js";
import authMiddleware from "../middlewares/auth.js";

const signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !user.authenticate(req.body.password)) {
      return res.status(401).send({ error: "Email and password don't match." });
    }

    const token = generateToken(user);
    res.cookie("t", token, { expire: new Date() + 9999 });
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(401).json({ error: "Could not sign in" });
  }
};
const signout = (req, res) => {
  res.clearCookie("t");
  return res.status(200).json({
    message: "Signed out. Remove the bearer token on the client.",
  });
};

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.user &&
    req.profile._id.toString() === req.user.id;
  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized",
    });
  }
  next();
};
const requireAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Administrator access required." });
  }
  next();
};

export default {
  signin,
  signout,
  requireSignin: authMiddleware,
  hasAuthorization,
  requireAdmin,
};
