import mongoose from "mongoose";
import bcrypt from "bcryptjs"

// following inputs are using for Signup/Login

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }

)

// the function, which compare the encoded password and matching
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


userSchema.pre('save', async function (next) {
    // Only run this function when password was modyfied
    if (!this.isModified('password')) {
        next()
    }
    
    const salt = await bcrypt.genSalt(10)
    // Hash password
    this.password = await bcrypt.hash(this.password, salt)

})

const User = mongoose.model('User', userSchema)

export default User