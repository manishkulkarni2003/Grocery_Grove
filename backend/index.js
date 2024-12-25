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
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Database config
connectDB();

// Rest object
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../client/dist')));

// Routes
app.use('/api/v1/auth', authroutes);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/product', productRoute);

// Fallback route
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

// Port configuration
const PORT = process.env.PORT || 8080;



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
