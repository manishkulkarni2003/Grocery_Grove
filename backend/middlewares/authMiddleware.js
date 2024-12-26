import JWT from "jsonwebtoken";
import userModel from "../models/user.model.js";

// Protected Route Token base
export const requireSignIn = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization header missing"
            });
        }

        // Check if token follows Bearer format
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Invalid token format. Must be 'Bearer <token>'"
            });
        }

        // Extract the token
        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        // Verify token
        const decoded = JWT.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }

        // Attach user info to request
        req.user = decoded;
        next();

    } catch (err) {
        console.error("Auth Middleware Error:", err);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
            error: err.message
        });
    }
};

// Admin Access
export const isAdmin = async (req, res, next) => {
    try {
        if (!req.user?._id) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        const user = await userModel.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.role !== 1) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized Access - Admin privileges required"
            });
        }

        // Add user object to request for future middleware/routes
        req.adminUser = user;
        next();

    } catch (err) {
        console.error("Admin Middleware Error:", err);
        return res.status(500).json({
            success: false,
            message: "Error in admin middleware",
            error: err.message
        });
    }
};