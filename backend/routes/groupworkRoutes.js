import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router()

import groupworkModel from '../models/groupworkModel.js'

// Groupwork register API
router.post('/add', asyncHandler(async (req, res) => {
    const { name, pnumber, sdate, stime, person, memo } = req.body;

    const newGroupwork = new groupworkModel({
        name, pnumber, sdate, stime, person, memo
    })

    const createdGrWork = await newGroupwork.save()
    res.json(createdGrWork);
}))

// Call all Groupwork data API
router.get('/all', asyncHandler(async (req, res) => {
    const groupwork = await groupworkModel.find().sort({ mDate: 1 })
    res.json(groupwork)
}))


// Call Groupwork Detail data API
router.get("/:id", asyncHandler(async (req, res) => {
    const groupwork = await groupworkModel.findById(req.params.id)
    res.json(groupwork)
}))

// delete Groupwork API
router.delete("/:id", asyncHandler( async (req, res) => {
    const groupwork = await groupworkModel.findById(req.params.id)
    if (groupwork) {
        await groupwork.remove()
        res.json({ message: "Groupwork removed" })
    } else {
        res.status(404)
        throw new Error("Groupwork not found")
    }
}))

//modify Groupwork API
router.put('/:id', asyncHandler(async (req, res) => {
    const groupwork = await groupworkModel.findById(req.params.id)
    console.log(groupwork)
    if (groupwork) {
        groupwork.name = req.body.name || groupwork.name
        groupwork.pnumber = req.body.pnumber || groupwork.pnumber
        groupwork.sdate = req.body.sdate || groupwork.sdate
        groupwork.stime = req.body.stime || groupwork.stime
        groupwork.person = req.body.person || groupwork.person
        groupwork.memo = req.body.memo || groupwork.memo

        const updateGroupwork = await groupwork.save()

        res.json(updateGroupwork)

    } else {
        res.status(404)
        throw new Error("Test not found")
    }
}) )

export default router;