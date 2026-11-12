import express from "express";
import qualificationCtrl from "../controllers/qualification.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();
router
  .route("/api/qualifications")
  .get(qualificationCtrl.list)
  .post(authCtrl.requireSignin, authCtrl.requireAdmin, qualificationCtrl.create);
router
  .route("/api/qualifications/:id")
  .get(qualificationCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.requireAdmin, qualificationCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.requireAdmin, qualificationCtrl.remove);
export default router;
