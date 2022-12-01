import {  Router } from "express"
import { getPollById, postChoice } from "../controllers/choiceController.js"
import { choiceSchemaValidation } from "../middlewares/choiceValidationMiddleware.js"

const router = Router()

router.post("/choice", choiceSchemaValidation, postChoice)
router.get("/poll/:id/choice", getPollById)

export default router