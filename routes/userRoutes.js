import express from "express"
import { login, register, contact } from "../controllers/userController.js"

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/contact', contact)

export default router