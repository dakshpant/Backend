import express from "express"
import profileController from "../controller/profile.controller.js"
import auth from '../middleware/auth.js'

const router = express.Router();

router.post('/createProfile', auth, profileController.createProfile);
router.get('/readProfile', auth, profileController.readProfile);
router.put("/updateProfile", auth, profileController.updateProfile);
router.delete("/deleteProfile", auth, profileController.deleteProfile);


export default router 