import express from "express"
import cors from "cors"
import chalk from "chalk"
import dotenv from "dotenv"
import router from "./routes/pollRoutes.js"
import joi from "joi"

dotenv.config()

import pollRouter from "./routes/pollRoutes.js"

const app = express()
app.use(cors())
app.use(express.json())

app.use(router)
app.use(pollRouter)


const port = process.env.PORT || 5000
app.listen(port, () => 
    console.log(chalk.bgWhite.green.bold(` Server running on port + ${port} `)))
