import express from 'express'
import createUser from '../controllers/user/createUser.js'
import loginUser from '../controllers/user/loginUser.js'
import viewUsers from '../controllers/user/viewUsers.js'

const router = express.Router()

router.post('/signup', createUser)
router.post('/login', loginUser)
// router.post('/signout', signoutUser)

// dev only route
router.get('/', viewUsers)

export default router
