import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import joi from "joi"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.listen(process.env.PORT, () => {
    console.log("Server running on port" + process.env.PORT)
})

// app.listen(5000, () => console.log("Server running in port : 5000"))