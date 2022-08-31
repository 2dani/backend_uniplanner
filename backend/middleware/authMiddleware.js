import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

//AuthMiddleware creates authorization middleware obj

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer') // Bearer authentication : give access to the bearer of this token and startsWith() method returns true if a string starts with a specified string.
  ) {
    try {
      // verfify Token

      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      // there is token, but failed
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }
  // when there is no token 
  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})


// i didn't make admin page
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

export { protect, admin }
