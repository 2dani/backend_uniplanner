import jwt from 'jsonwebtoken'

//sign Token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', //expires in 30 days
  })
}

export default generateToken
