import express from "express"
import { createContact, getContact } from "../controllers/contact.controller.js"

const router=express.Router()

router.post("/",createContact)
router.get("/",getContact)



export default router