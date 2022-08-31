import mongoose from "mongoose";

// following inputs are using for Test-date Counter

const testSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
          },
        testName: {
            type: String,
            required: true,
        },
        testDate: {
            type: String,
            required: true,
        },
        timeStart: {
            type: String,
            required: true,
        },
        timeEnd:{
            type: String,
            required: true,
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