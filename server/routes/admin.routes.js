import express from "express";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

router.get(
  "/api/admin",
  authCtrl.requireSignin,
  authCtrl.requireAdmin,
  (req, res) => res.json({ message: "Authorized administrator request.", user: req.user }),
);

export default router;
