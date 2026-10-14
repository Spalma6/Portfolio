import express from "express";
import qualificationCtrl from "../controllers/qualification.controller.js";

const router = express.Router();
router.route("/api/qualifications").get(qualificationCtrl.list).post(qualificationCtrl.create);
router.route("/api/qualifications/:id").get(qualificationCtrl.read).put(qualificationCtrl.update).delete(qualificationCtrl.remove);
export default router;
