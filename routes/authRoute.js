import express from "express"
import { registerController, loginController, testController, forgotPasswordController, updateProfileController } from "../controllers/authController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"


//router object
const router = express.Router()

//routing
//Register ||Method POST
router.post('/register', registerController);
//login
router.post('/login', loginController)

//forgot password
router.post('/forgot-password', forgotPasswordController)

router.get('/test', requireSignIn, isAdmin, testController)

//protected Route auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).json({ ok: true })
})

//protected Router for admin

router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).json({ ok: true })
})

//profile route
router.put('/profile', requireSignIn, updateProfileController)


export default router;