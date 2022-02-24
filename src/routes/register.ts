import { Router } from "express";
import { registerUser } from "../controllers/registerController";
const router = Router();

router.route('/').post(registerUser);

export default router;