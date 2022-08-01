import express from "express"
import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"

import { protect } from "../middleware/authMiddleware.js"
const router = express.Router()




// Idification API

//Signup API

router.post('/signup', asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const existedUser = await User.findOne({ email })

    if (existedUser) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        res.json(user)
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

}))


//Login API
router.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Check Email already exists -> password Matching -> result

    const user = await User.findOne({ email })

    if (!user) {
        res.status(404)
        throw new Error('User is not registerd')
    }

    // Password Matching

    if (user && (await user.matchPassword(password))) {
        res.json({
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }


}))


// my profile API

router.get('/profile', protect, asyncHandler(async (req, res) => {
    res.json(req.user)
}))


export default router