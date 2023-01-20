import generateId from '../helpers/generateId.js'
import User from '../models/User.js'

const registerUser = async (req, res) => {
  try {
    const { email } = req.body
    const userExists = await User.findOne({ email })

    if (userExists) {
      const error = new Error('Usuario ya registrado')
      res.status(400).json({ msg: error.message })
    }

    const user = new User(req.body)
    user.token = generateId()

    const newUser = await user.save(user)
    res.json(newUser)
  } catch (error) {
    console.log(error)
  }
}

const authenticateUser = async (req, res) => {
  try {
    res.send('autenticar')
  } catch (error) {
    console.log(error)
  }
}

export {
  registerUser,
  authenticateUser
}
