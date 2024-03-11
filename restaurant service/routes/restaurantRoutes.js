import express from "express";
import { register, addMenu, activity, login } from "../controllers/index.js";


const router=express.Router();

router.post('/register',register);
router.post('/menus',addMenu);
router.post('/activity',activity);
router.post('/login',login);

export default router;