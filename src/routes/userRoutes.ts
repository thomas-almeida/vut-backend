import { Router } from "express"
import userController from "../controllers/userController"
import upload from "../utils/upload"
const api = Router()

api.post('/sign-up', upload.single('image'), userController.SignUp)

export default api