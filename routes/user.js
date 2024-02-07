import express from "express";
import { getUserDetails, login, signup } from "../controllers/user.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

//route for getting user details
router.get("/user/details", verifyToken, getUserDetails);

//route for login
router.post("/login", login);

//route for signup
router.post("/signup", signup);

export default router;