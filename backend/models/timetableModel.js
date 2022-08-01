import mongoose from "mongoose";

const timetableSchema = mongoose.Schema(

    {
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
        itype: {
            type: String,
            default: "custom"
        },
    },

    {
        timestamps : true
    }





)





const Timetable = mongoose.model('Timetable', timetableSchema)

export default Timetable