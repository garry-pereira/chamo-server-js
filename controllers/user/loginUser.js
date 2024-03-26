import User from '../../models/User.js'
import bcrypt from 'bcrypt'

const loginUser = async (req, res) => {
  // if the user does not fill out username and password, then we can't log them in.
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .json({ success: false, message: 'Complete all fields' })
  }

  // at this point they have filled it out
  // so we try to log in, find a user with the same username provided
  // grab the password from the user we just grabbed from the database
  try {
    const existingUser = await User.findOne({ username: req.body.username })

    if (existingUser) {
      console.log('Attempting to log in..')
      if (await bcrypt.compare(req.body.password, existingUser.password)) {
        // at this point the passwords match
        return res.status(200).json({ success: true, message: 'Logged in.' })
      } else {
        // this is the case where the password just doesn't match
        return res.status(401).json({
          success: false,
          message: 'Incorrect username/password combination.',
        })
      }
    }
    // this is the case that the username does not exist (output should be same)
    return res.status(401).json({
      success: false,
      message: 'Incorrect username/password combination.',
    })
  } catch (err) {
    console.error(`Error logging in: ${err}`)
    return res.status(500).json({
      success: false,
      message: 'Error while attempting to log in.',
    })
  }
}

export default loginUser
