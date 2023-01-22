import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const checkAuth = async (req, res, next) => {
  try {
    let token = ''
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password -state -token -createdAt -updatedAt -__v')
      return next()
    }

    if (!token) {
      const error = new Error('Token no válido')
      res.status(401).json({ msg: error.message })
    }
  } catch (error) {
    return res.status(404).json(error)
  }
}

export default checkAuth
