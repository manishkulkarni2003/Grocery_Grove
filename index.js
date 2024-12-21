import express from "express"

import dotenv from "dotenv"

dotenv.config();


//rest object
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Hello World")
})

const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
    console.log(`server is running is on http://localhost:${PORT}`)

})
