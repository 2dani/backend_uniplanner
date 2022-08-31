import mongoose from "mongoose";

// following inputs are using for timetable

const timetableSchema = mongoose.Schema(

    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
          },
        name: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true,
        },
        startTime: {
            type: Date,
            required: true
        },
        endTime: {
            type: Date,
            required: true
        },
        day: {
            type: Number,
            required: true,
            default: 0
        },
        
    },

    {
        timestamps : true
    }



)



const Timetable = mongoose.model('Timetable', timetableSchema)

export default Timetable