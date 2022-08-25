import asyncHandler from 'express-async-handler'
import Todo from '../models/todoModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getTodos = asyncHandler(async (req, res) => {
  
  //const todos = await Todo.find().sort({createdAt: -1})
  const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 })
  
  res.json(todos)

})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})




const createTodo = asyncHandler(async (req, res) => {
  
  const {todo, endDate} = req.body;
  
  const newTodo = new Todo({ todo, endDate, user: req.user._id })

  const createdTodo = await newTodo.save()
  res.status(201).json(createdTodo)
})





// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
})

export {
  getTodos,
  getProductById,
  createTodo,
  getTopProducts,
}
