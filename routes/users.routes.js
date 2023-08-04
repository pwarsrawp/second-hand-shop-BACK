const router = require("express").Router();
const User = require("../models/User.model")


/* GET ALL USERS */
router.get('/', async (req, res) => {
  const allUsers = await User.find()
  res.json(allUsers)
})

/* GET ONE USER */
router.get('/:userId', async (req, res) => {
  console.log(req.params)
  const oneUser = await User.findById(req.params.userId)
  res.json(oneUser)
})

/* CREATE USER */
router.post('/', async (req, res) => {
  const newUser = await User.create(req.body)
  res.status(201).json(newUser)
})

/* UPDATE USER */
router.put('/:userId', async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
    new: true,
  })
  res.json(updatedUser)
})

/* DELETE USER */
router.delete('/:userId', async (req, res) => {
  await User.findByIdAndDelete(req.params.userId)
  res.status(202).json({ message: 'User successfully deleted' })
})

module.exports = router