import { JWT_SECRET } from '../config/config.js'
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: 'User already exists.' })
    }

    const userInfo = new User({
      email,
      name,
      password,
    })

    await userInfo.save()

    userInfo.password = undefined
    res.status(201).json({
      success: true,
      message: 'User Created Successfully.',
      data: userInfo,
    })
  } catch (error) {
    console.log(error)
    res.send({ success: false, message: error.message })
  }
}

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body

    const isUserExists = await User.findOne({ email })

    if (!isUserExists) {
      res.status(400).send({ success: false, message: 'Email does not exist' })
    }

    // const user = await User.findOne({ email });
    // if (!user || !(await bcrypt.compare(password, user.password))) {
    //     return res.status(401).json({ message: 'Invalid credentials' });
    // }

    const isPasswordCorrect = await isUserExists.comparePassword(password)

    if (!isPasswordCorrect) {
      res.status(401).send({ success: false, message: 'Incorrect Password' })
    }

    // Token Generation

    const expiresIn = 7 * 24 * 60 * 60

    const token = jwt.sign({ id: isUserExists._id }, JWT_SECRET, {
      expiresIn,
    })

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      maxAge: expiresIn * 1000,
    })

    isUserExists.password = undefined

    res.status(200).json({
      success: true,
      data: isUserExists,
      message: 'User logged in successfully',
      expiresIn,
    })
  } catch (error) {
    // console.log(error)
    // res.status(400).json({ success: false, message: error.message })
  }
}
