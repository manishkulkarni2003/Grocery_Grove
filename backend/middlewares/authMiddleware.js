import JWT from "jsonwebtoken"
import userModel from "../models/user.model.js";

//Protected Route Token base

export const requireSignIn = async (req, res, next) => {
    try {

        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);

        req.user = decode;

        next();

    } catch (err) {
        console.log(`Error While Verify The tokens ${err}`)
    }


}

//admin Access
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)
        if (user.role !== 1) {
            return res.status(403).json({ success: false, message: "UnAuthorized Access" })
        } else {
            next();
        }

    } catch (err) {
        console.log(`Error While Checking Admin ${err}`)
        res.status(401).json({ success: false, err, message: "error in admin middleware" })
    }
}