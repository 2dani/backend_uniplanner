import mongoose from 'mongoose'

// following inputs are using for Todolist

const todoSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },

    todo: {
      type: String,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    finish: {
      type: Boolean,
      default:false,
    },
   
  },
  {
    timestamps: true,
  }
)

const Todo = mongoose.model('Todo', todoSchema)

export default Todo
