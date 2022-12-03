import {
    postPoll,
    getPool,
} from "../controllers/pollController.js"

import {  Router } from "express"
import { pollSchemaValidation } from "../middlewares/pollValidationMiddleware.js"
import { showResults } from "../controllers/voteController.js"

const router = Router()

router.post("/poll", pollSchemaValidation, postPoll)
router.get("/poll", getPool)
router.get("/poll/:id/result", showResults)

export default router