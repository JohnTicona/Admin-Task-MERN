import generateId from '../helpers/generateId.js'
import generateJWT from '../helpers/generateJWT.js'
import User from '../models/User.js'

const registerUser = async (req, res) => {
  try {
    // verify that the user exists
    const { email } = req.body
    const userExists = await User.findOne({ email })

    if (userExists) {
      const error = new Error('Usuario ya registrado')
      res.status(400).json({ msg: error.message })
    }

    const user = new User(req.body)
    // generate token user
    user.token = generateId()

    // register new user
    const newUser = await user.save(user)
    res.status(201).json(newUser)
  } catch (error) {
    console.log(error)
  }
}

const authenticateUser = async (req, res) => {
  try {
    // verify that the user exists
    const { email, password } = req.body
    const userExists = await User.findOne({ email })
    if (!userExists) {
      const error = new Error('El usuario no existe')
      res.status(404).json({ msg: error.message })
    }
    // Check if the user is confirmed
    if (!userExists.state) {
      const error = new Error('El cuenta no esta verificada')
      res.status(404).json({ msg: error.message })
    }

    // Check password
    if (await userExists.checkPassword(password, userExists.password)) {
      res.status(200).json({
        _id: userExists.id,
        name: userExists.name,
        email: userExists.email,
        token: generateJWT(userExists.id)
      })
    } else {
      const error = new Error('La contraseña es incorrecta')
      res.status(404).json({ msg: error.message })
    }
  } catch (error) {
    console.log(error)
  }
}

const confirm = async (req, res) => {
  try {
    // verify user token
    const { token } = req.params
    const userVerify = await User.findOne({ token })

    if (!userVerify) {
      const error = new Error('Token no válido')
      res.status(404).json({ msg: error.message })
    }
    // update the confirmed user
    userVerify.state = true
    userVerify.token = ''
    await userVerify.save()
    res.json({ msg: 'Usuario confirmado correctamente' })
  } catch (error) {
    console.log(error)
  }
}

const forgotPassword = async (req, res) => {
  try {
    // verify that the user exists
    const { email } = req.body
    const userExists = await User.findOne({ email })

    if (!userExists) {
      const error = new Error('El usuario no existe')
      res.status(404).json({ msg: error.message })
    }

    userExists.token = generateId()
    await userExists.save()

    res.status(200).json({ msg: 'Se envió a tu correo las intrucciones' })
  } catch (error) {
    console.log(error)
  }
}

const checkToken = async (req, res) => {
  try {
    const { token } = req.params
    const validToken = await User.findOne({ token })

    if (validToken) {
      res.status(200).json({ msg: 'Token válido' })
    } else {
      const error = new Error('Token no válido')
      res.status(404).json({ msg: error.message })
    }
  } catch (error) {
    console.log(error)
  }
}

const newPassword = async (req, res) => {
  try {
    // verify user token
    const { token } = req.params
    const { password } = req.body

    const user = await User.findOne({ token })

    if (user) {
      // change password for new password
      user.password = password
      user.token = ''
      await user.save()
      res.status(201).json({ msg: 'La contraseña se modificó correctamente' })
    } else {
      const error = new Error('Token no válido')
      res.status(404).json({ msg: error.message })
    }
  } catch (error) {
    console.log(error)
  }
}

const profile = async (req, res) => {
  try {
    const { user } = req
    res.status(200).json(user)
  } catch (error) {
    console.log('error')
  }
}

export {
  registerUser,
  authenticateUser,
  confirm,
  forgotPassword,
  checkToken,
  newPassword,
  profile
}
