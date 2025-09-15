import express from "express";
import encryptDecryptController from "../controllers/encrypt_decrypt.controller.js";

const router = express.Router();

router.post("/encrypt", encryptDecryptController.encryptText);
router.post("/decrypt", encryptDecryptController.decryptText);

export default router;
