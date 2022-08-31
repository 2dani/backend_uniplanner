import mongoose from "mongoose";

// following inputs are using for meeting

const meetingSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
          },
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