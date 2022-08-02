import express from "express";
import asyncHandler from "express-async-handler"
import Timetable from "../models/timetableModel.js"

const router = express.Router()
import { protect } from "../middleware/authMiddleware.js"

// Timetable Register API
router.post('/',protect , asyncHandler(async (req, res) => {
    const { name, location, startTime, endTime, day } = req.body;

    const newTimetable = new Timetable({
        name,
        location,
        startTime: "2018-02-23T" + startTime,
        endTime: "2018-02-23T" + endTime,
        day,
        user: req.user._id
    })

    const createdTimetable = await newTimetable.save()
    res.json(createdTimetable);
}))




// Call all Timetable data
router.get('/all',protect , asyncHandler(async (req, res) => {
    const timetable = await Timetable.find({user:req.user._id})
    res.json(timetable)
}))

//remove the timetable data
router.delete('/:id',protect , asyncHandler(async (req, res) => {
    const timetable = await Timetable.findById(req.params.id)

    if (timetable) {
        await timetable.remove()
        res.json({ message: "timetable removed" })
    } else {
        res.status(404)
        throw new Error("timetable not found")
    }
}))



export default router