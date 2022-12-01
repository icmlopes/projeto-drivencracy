import {  Router } from "express"
import { postVoteById } from "../controllers/voteController.js"


const router = Router()

router.post("/choice/:id/vote", postVoteById)

export default router