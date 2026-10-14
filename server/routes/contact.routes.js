import express from "express";
import contactCtrl from "../controllers/contact.controller.js";

const router = express.Router();
router.route("/api/contacts").get(contactCtrl.list).post(contactCtrl.create);
router.route("/api/contacts/:id").get(contactCtrl.read).put(contactCtrl.update).delete(contactCtrl.remove);
export default router;
