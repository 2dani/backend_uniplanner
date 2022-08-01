import express from "express";
import asyncHandler from "express-async-handler"
import Test from "../models/testModel.js";

const router = express.Router()

//all Test data get API

router.get('/all', asyncHandler(async (req, res) => {
    const tests = await Test.find().sort({ testDate: 1 })
    res.json(tests)
}))

//상세 Test를 가져오는 API
router.get("/:id", asyncHandler(async (req, res) => {
    const testOne = await Test.findById(req.params.id)
    res.json(testOne)
}))


//test restration API
router.post('/', asyncHandler(async (req, res) => {
    const { testName, testDate, timeStart, timeEnd, memo } = req.body;

    const newTest = new Test({
        testName, testDate, timeStart, timeEnd, memo
    })

    const createdTest = await newTest.save()
    res.json(createdTest);


}))

// test modify API
router.put('/:id', asyncHandler(async (req, res) => {
    const testOne = await Test.findById(req.params.id)

    if (testOne) {
        testOne.testName = req.body.testName || testOne.testName
        testOne.testDate = req.body.testDate || testOne.testDate
        testOne.timeStart = req.body.timeStart || testOne.timeStart
        testOne.timeEnd = req.body.timeEnd || testOne.timeEnd
        testOne.memo = req.body.memo || testOne.memo

        const updateTestOne = await testOne.save()

        res.json(updateTestOne)

    } else {
        res.status(404)
        throw new Error("Test not found")
    }

    

}) )

//delete API
router.delete("/:id", asyncHandler( async (req, res) => {
    const testOne = await Test.findById(req.params.id)
    if (testOne) {
        await testOne.remove()
        res.json({ message: "Test removed" })
    } else {
        res.status(404)
        throw new Error("Test not found")
    }
}))



// modify test data file

/*
router.patch("/:id", asyncHandler(async (req, res) => {

    const testm = await Test.findById(req.params.id)

    if (testm) {
        testm.submited = !testm.submited

        const newTestday = await submit.save()

        res.json(newTestday)
    }
}))
*/

// remove Testdday data api

router.delete("/:id", asyncHandler(async (req, res) => {
    const testdday = await Test.findById(req.params.id)

    if (testdday) {
        await testdday.remove()
        res.json({ message: "Test removed" })
    } else {
        res.status(404)
        throw new Error("Test not found")
    }
}))


export default router