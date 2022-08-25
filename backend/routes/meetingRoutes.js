import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router()
import { protect } from "../middleware/authMiddleware.js"

import meetingModel from "../models/meetingModel.js"


// Meeting register API
router.post('/',protect , asyncHandler(async (req, res) => {
    const { title, mDate, sTime, link } = req.body;

    const newMeeting = new meetingModel({
        title, mDate, sTime, link,
        user: req.user._id
    })

    const createdMeeting = await newMeeting.save()
    res.json(createdMeeting);
}))


// Call all Meeting data API
router.get('/all',protect , asyncHandler(async (req, res) => {
    const meeting = await meetingModel.find({user:req.user._id}).sort({ meetingDate: 1 })
    res.json(meeting)
}))




// delete meeting data
router.delete("/:id",protect , asyncHandler( async (req, res) => {
    const meeting = await meetingModel.findById(req.params.id)
    if (meeting) {
        await meeting.remove()
        res.json({ message: "Test removed" })
    } else {
        res.status(404)
        throw new Error("Test not found")
    }
}))

/*
// Call meeting Data Details
router.get("/:id",protect , asyncHandler(async (req, res) => {
    const meetingOne = await meetingModel.findById(req.params.id)
    res.json(meetingOne)
}))



// modify the meeting data
router.put('/:id',protect , asyncHandler(async (req, res) => {
    const meeting = await meetingModel.findById(req.params.id)

    if (meeting) {
        meeting.title = req.body.title || meeting.title
        meeting.mDate = req.body.mDate || meeting.mDate
        meeting.sTime = req.body.sTime || meeting.sTime
        meeting.link = req.body.link || meeting.link

        const updateMeeting = await meeting.save()

        res.json(updateMeeting)

    } else {
        res.status(404)
        throw new Error("Test not found")
    }
}) )
*/

export default router