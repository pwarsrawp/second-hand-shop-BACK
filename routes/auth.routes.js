const router = require('express').Router()
const User = require('../models/User.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('../middlewares/jwt.middleware')


/////////////////////////////////////////////
///////////* AUTH ROUTE CHECK *//////////////
/////////////////////////////////////////////
router.get('/', (req, res, next) => {
  res.json('Works!')
})

/////////////////////////////////////////////
///////////* SIGNUP -- POST ROUTE *//////////
/////////////////////////////////////////////
router.post('/signup', async (req, res) => {
  const payload = req.body

  const salt = bcrypt.genSaltSync(13)
  const passwordHash = bcrypt.hashSync(payload.password, salt)

  try {
    await User.create({ username: payload.username, email: payload.email, password: passwordHash })
    res.status(201).json({ message: 'User added successfully' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

/////////////////////////////////////////////
///////////* LOGIN -- POST ROUTE *///////////
/////////////////////////////////////////////
router.post('/login', async (req, res) => {
  const payload = req.body
  const potentialUser = await User.findOne({ email: payload.email })
  if (potentialUser) {
    const doPasswordsMatch = bcrypt.compareSync(payload.password, potentialUser.password)
    if (doPasswordsMatch) {
      const authToken = jwt.sign({ userId: potentialUser._id }, process.env.TOKEN_SECRET, {
        algorithm: 'HS256',
        expiresIn: '6h',
      })
      res.status(202).json({ token: authToken })
    } else {
      res.status(403).json({errorMessage: 'Invalid username or password'})
    }
  } else {
    res.status(403).json({errorMessage: 'User not found'})

  }
})

/////////////////////////////////////////////
///////////* VERIFICATION ROUTE *////////////
/////////////////////////////////////////////
router.get('/verify', isAuthenticated, async(req, res) => {
  console.log('req.payload from JWT ==>', req.payload)
  const currentUser = await User.findById(req.payload.userId)
  currentUser.password = '**********'
  res.status(200).json({message: 'Token OK', currentUser})
})

module.exports = router
