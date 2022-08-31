import asyncHandler from 'express-async-handler' // It makes your code easier to understand.
import Todo from '../models/todoModel.js'

// show screen the Todos sorted by created Time sorted in descending
const getTodos = asyncHandler(async (req, res) => {
  
  const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 })
  
  res.json(todos) // sends a JSON response.

})

// register Todo 
const createTodo = asyncHandler(async (req, res) => {
  
  const {todo, endDate} = req.body; // post request is delivered through req.body
  
  const newTodo = new Todo({ todo, endDate, user: req.user._id }) // register todo for each users

  const createdTodo = await newTodo.save()
  res.status(201).json(createdTodo)
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


// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
})

export {
  getTodos,
  createTodo,
  getProductById,
  getTopProducts,
}
