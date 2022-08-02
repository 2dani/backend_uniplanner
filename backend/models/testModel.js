import mongoose from "mongoose";

const testSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
          },
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