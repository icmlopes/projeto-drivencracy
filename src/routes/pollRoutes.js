import {
    postPoll,
    getPool,
} from "../controllers/pollController.js"

import {  Router } from "express"
import { pollSchemaValidation } from "../middlewares/pollValidationMiddleware.js"

const router = Router()

router.post("/poll", pollSchemaValidation, postPoll)
router.get("/poll", getPool)

export default router