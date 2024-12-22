import userModel from "../models/user.model.js";
import { hashPassword } from "../utils/authUtil.js";
import JWT from "jsonwebtoken"
import { comparePassword } from "../utils/authUtil.js"

const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;

        // Validations
        if (!name || !email || !password || !phone || !address || !answer) {
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
            answer
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

const loginController = async (req, res) => {
    try {

        const { email, password } = req.body

        //validation
        if (!email || !password) {
            return res.status(400).json({ message: "All Fields Are Required" })
        }
        // Check if user exists
        const user = await userModel.findOne({ email: email })
        if (!user) {
            return res.status(404).json({ success: false, message: "User Doesnt Exists" })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).json({ success: false, message: "Invalid Password" })
        }

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })


        res.status(200).json({
            success: true, message: "User Logged In Successfully", user: {
                name: user.name,
                email: user.email
            }, token: token  //Remove Token While Deploying
        })

    } catch (err) {
        console.log(`Error while Logging in ${err}`)
        return res.status(500).json({ success: false, message: "Error While Logging The User" })
    }
}

//forgot password
const forgotPasswordController = async (req, res) => {
    try {

        const { email, answer, newPassword } = req.body;
        if (!email || !answer || !newPassword) {
            res.status(400).json({

                message: "Email or answer or newPassword  is Required"
            })
        }
        //check 
        const user = await userModel.findOne({ email: email, answer: answer })
        if (!user) {
            return res.status(404).json({ success: false, message: "Wrong email or answer" })
        }
        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, { password: hashed })
        res.status(200).json({
            success: true,
            message: "Password Reset Successfully"
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Something Went Wrong",
            err
        })
    }

}




//testController

const testController = (req, res) => {
    res.send("protected Route")
}



export { registerController, loginController, testController, forgotPasswordController };
