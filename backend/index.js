import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authroutes from "./routes/authRoute.js";
import cors from "cors";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import path from "path";
import { fileURLToPath } from "url";

// Configure `__dirname` for ES modules


dotenv.config();

// Database config
connectDB();

// Rest object
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Fixing the path to the dist folder


// Debugging log for path


// Serve static files (Frontend build)


// Routes
app.use('/api/v1/auth', authroutes);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/product', productRoute);


app.get('/', (req, res) => {
    res.send('Hello World'); // This will be shown when you access the root URL
});

// Port configuration
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
