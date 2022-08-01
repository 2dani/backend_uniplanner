import mongoose from "mongoose";

const meetingSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        mDate: {
            type: String,
            required: true
        },
        sTime:{
            type: String,
            required: true
        },
        link: {
            type: String
            
        },
    },
    {
        timestamps: true
    }
)





const Meeting = mongoose.model('Meeting', meetingSchema)
export default Meeting