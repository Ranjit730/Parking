import { Register, Login } from "../controllers/auth.controller.js";
import express from "express";
import { loginValidate, signupValidate } from "../middlewares/validate.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", signupValidate,  Register);
authRouter.post("/login",loginValidate, Login);

export default authRouter;
