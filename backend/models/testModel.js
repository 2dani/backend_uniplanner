import mongoose from "mongoose";

const testSchema = mongoose.Schema(
    {
        testName: {
            type: String,
            requireed: true,
        },
        testDate: {
            type: String,
            requireed: true,
        },
        timeStart: {
            type: String,
            requireed: true,
        },
        timeEnd:{
            type: String,
            requireed: true,
        },
        memo:{
            type: String,
            
        },
    },
    {
        timestamps: true
    }
)

const Test = mongoose.model("Test", testSchema)

export default Test