import express from "express";
const router = express.Router()
import Submit from "../models/submitModel.js";
import asyncHandler from "express-async-handler"
import { protect } from "../middleware/authMiddleware.js"

// add a homework api
router.post("/add", protect, asyncHandler(async (req, res) => {
    const{name, practiceNum, submitDate, memo, submitTime} = req.body

    const newHomework = new Submit({
        name, practiceNum, submitDate, memo, submitTime,
        user: req.user._id
    })

    const createdHW =  await newHomework.save()
    res.status(201).json(createdHW);
}))

// registered all homework api
router.get("/", protect, asyncHandler(async (req,res) => {
    const homeworks = await Submit.find({user:req.user._id}).sort({ submitDate: 1 })
    return res.json(homeworks);
}))


// modify homework data file

router.patch("/:id", protect, asyncHandler(async (req, res) => {

    const submit = await Submit.findById(req.params.id)

    if (submit) {
        submit.submited = !submit.submited

        const newSubmit = await submit.save()

        res.json(newSubmit)
    }
}))



// remove homework data api
router.delete("/:id", protect, asyncHandler(async (req, res) => {
    const homework = await Submit.findById(req.params.id)

    if (homework) {
        await homework.remove()
        res.json({ message: "homework removed" })
    } else {
        res.status(404)
        throw new Error("Homework not found")
    }
}))


// Submit Detail Data
router.get("/:id", protect, asyncHandler(async (req, res) => {
    const submit = await Submit.findById(req.params.id)
    res.json(submit)
}))

export default router