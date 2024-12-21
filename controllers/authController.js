import userModel from "../models/user.model.js";
import { hashPassword } from "../utils/authUtil.js";

const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        // Validations
        if (!name || !email || !password || !phone || !address) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Save the user to the database
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
        }).save();

        // Success response
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user // Optional: You can send user data if needed
        });
    } catch (err) {
        console.error(`Error While Registering User: ${err.message}`);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export { registerController };
