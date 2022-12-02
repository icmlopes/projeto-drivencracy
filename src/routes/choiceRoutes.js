import {  Router } from "express"
import { getPollById, postChoice } from "../controllers/choiceController.js"
import { choiceSchemaValidation, dateValidation } from "../middlewares/choiceValidationMiddleware.js"

const router = Router()

router.post("/choice", choiceSchemaValidation, dateValidation, postChoice)
router.get("/poll/:id/choice", getPollById)

export default router