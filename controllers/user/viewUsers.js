import User from '../../models/User.js'

const viewUsers = async (req, res) => {
  try {
    const allUsers = await User.find({}, 'username password')
    return res.status(200).json({ success: true, data: { users: allUsers } })
  } catch (err) {
    console.error(`Error fetching users: ${err.message}`)
    return res
      .status(500)
      .json({ success: false, message: 'Unable to fetch users' })
  }
}

export default viewUsers
