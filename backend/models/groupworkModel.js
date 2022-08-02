import mongoose from "mongoose";

const groupworkSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
          },
        name: {
            type: String,
            required: true,
        },
        pnumber: {
            type: String,
            required: true,
        },
        sdate: {
            type: String,
            required: true,
        },
        stime: {
            type: String,
            required: true,
        },
        person:{
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




const Groupwork = mongoose.model('Groupwork', groupworkSchema)
export default Groupwork