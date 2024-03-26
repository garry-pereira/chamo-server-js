import User from '../../models/User.js'
import bcrypt from 'bcrypt'

const createUser = async (req, res) => {
  // make sure all fields are filled out
  if (!req.body.name || !req.body.username || !req.body.password) {
    return res
      .status(400)
      .json({ success: false, message: 'Complete all fields' })
  }

  // check to see if we can make this user
  try {
    const existingUser = await User.findOne({ username: req.body.username })

    if (!existingUser) {
      // const hashedPassword = await bcrypt.hash(req.body.password, 10)
      await User.create({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
      })
      return res.status(201).json({ success: true, message: 'Created user.' })
    }
    return res
      .status(400)
      .json({ success: false, message: 'Username is unavailable.' })
  } catch (err) {
    console.error(`Error creating user: ${err}`)
    return res.status(500).json({
      success: false,
      message: 'Error while attempting to create user.',
    })
  }
}

export default createUser
