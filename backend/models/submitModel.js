import mongoose from 'mongoose'


const submitSchema = mongoose.Schema(
  {
     user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User'
        },
    name:{
        type: String,
        required: true
    },
    practiceNum: {
        type: Number,
        default: 1,
    
    },
   submitDate: {
        type: String,
        required: true

   },
   submitTime: {
        type: String,
        required: true
   },
   memo:{
     type: String,
   },
   submited:{
        type: Boolean,
        dafault:false,
   }
  },
  {
    timestamps: true,
  }
)

const Submit = mongoose.model('Submit', submitSchema)

export default Submit
