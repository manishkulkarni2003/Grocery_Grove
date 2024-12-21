import express from "express"
import { registerController, loginController, testController } from "../controllers/authController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js"


//router object
const router = express.Router()

//routing
//Register ||Method POST
router.post('/register', registerController);
//login
router.post('/login', loginController)

router.get('/test', requireSignIn, isAdmin, testController)


export default router;