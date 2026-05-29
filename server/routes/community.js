import express from "express"
import * as controller from "../controller/community.js"

const router = express.Router()

router.get("/event", controller.eventAll)

export default router;