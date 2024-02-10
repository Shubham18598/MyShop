import express from "express"
import {
  forgotPasswordController,
  loginController,
  registerController,
  testController,
  updateProfileController,
} from "../controllers/authController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"
//router object

const router = express.Router()

//routing

//REGISTER || METHOD POST
router.post("/register", registerController)

//LOGIN || METHOD POST
router.post("/login", loginController)

//test routes
router.get("/test", requireSignIn, isAdmin, testController)

//Forgot password routes || POST

router.post("/forgot-password", forgotPasswordController)

//Private user route auth

router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true })
})

//Private Admin route auth

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true })
})

//Update Profile
router.put('/profile',requireSignIn,updateProfileController)

export default router
