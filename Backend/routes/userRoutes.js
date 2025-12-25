const express = require('express');
const router = express.Router();
const {registerUser,LoginUser,logout,getMe, forgetPaassword, resetPassword}=require('../controller/userController')
const { isAuthenticated } =require('../middleware/authenticate')
router.route("/register").post(registerUser);
router.route("/login").post(LoginUser);
router.route("/logout").post(logout);
router.get("/me", isAuthenticated, getMe);
router.route("/forget").post(forgetPaassword);
router.route("/reset/:token").post(resetPassword);
module.exports=router