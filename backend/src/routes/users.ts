import express from "express";
// se sho e vo ovoj file users, neka bide wrapuvano pod UserController; Kako object da mu bide
import * as UserController from "../controllers/users";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

router.get('/', requiresAuth, UserController.getAuthenticatedUser)
router.post('/signup', UserController.signUp)
router.post("/login", UserController.login)
router.post("/logout", UserController.logout);

export default router;

