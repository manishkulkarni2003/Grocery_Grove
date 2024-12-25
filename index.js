import express from "express"

import dotenv from "dotenv"
import connectDB from "./config/db.js";
import authroutes from "./routes/authRoute.js"
import cors from "cors"
import categoryRoute from "./routes/categoryRoute.js"
import productRoute from "./routes/productRoute.js"
import path from "path"

dotenv.config();
//database config
connectDB();
//rest object
const app = express();

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './client/dist')))

//routes
app.use('/api/v1/auth', authroutes)
app.use('/api/v1/category', categoryRoute)
app.use('/api/v1/product', productRoute)


app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/dist/index.html'))
})

const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
    console.log(`server is running is on http://localhost:${PORT}`)

})
