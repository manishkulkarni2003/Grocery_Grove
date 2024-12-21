import express from "express"

import dotenv from "dotenv"
import connectDB from "./config/db.js";
import authroutes from "./routes/authRoute.js"
dotenv.config();
//database config
connectDB();
//rest object
const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/v1/auth', authroutes)

app.get('/', (req, res) => {
    res.send("Hello World")
})

const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
    console.log(`server is running is on http://localhost:${PORT}`)

})
