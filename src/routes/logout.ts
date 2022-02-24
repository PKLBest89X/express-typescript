import { Router } from "express";
import { logoutUser } from '../controllers/logoutController';
const router = Router();

router.get("/", logoutUser);

export default router;