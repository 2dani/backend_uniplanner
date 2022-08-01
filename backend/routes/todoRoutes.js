import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import {
  getTodos,
  getProductById,
  createTodo,
  updateProduct,
  getTopProducts,
} from '../controllers/todoController.js'
import Todo from '../models/todoModel.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(protect, getTodos).post(protect, createTodo)
router.get('/top', getTopProducts)
router
  .route('/:id')
  .get(getProductById)
  //.put(updateProduct)

//update API
router.put('/:id', protect, asyncHandler(async (req, res) => {
  const todoOne = await Todo.findById(req.params.id)
  if (todoOne) {
    todoOne.todo = req.body.todo || todoOne.todo
    todoOne.endDate = req.body.endDate  || todoOne.endDate
    todoOne.finish = req.body.finish

    const updateTodo = await todoOne.save()
    res.json(updateTodo)
  } else {
    res.status(404)
    throw new Error("Todo not found")
  }
}))

// delete API
router.delete('/:id', protect, asyncHandler(async (req, res) => {
  
  const todoOne = await Todo.findById(req.params.id)
  if (todoOne) {
      await todoOne.remove()
      res.json({ message: "homework removed" })
  } else {
      res.status(404)
      throw new Error("Homework not found")
  }
}))

export default router
