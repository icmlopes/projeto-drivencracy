import {  Router } from "express"
import { postChoice } from "../controllers/choiceController.js"
import { choiceSchemaValidation } from "../middlewares/choiceValidationMiddleware.js"

const router = Router()

router.post("/choice", choiceSchemaValidation, postChoice)
// router.get("/poll", getChoice)

export default router