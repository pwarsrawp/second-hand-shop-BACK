const router = require("express").Router();
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const Purchase = require("../models/Purchase.model")

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
  const payload = req.body

  /* PASSWORD CHECK */
  try {
    if (!payload.passwordHash) {
      delete payload.passwordHash // new PW
      delete payload.password // old PW
    } else {
      const pwCheck = await User.findById(req.params.userId)
      if (bcrypt.compareSync(payload.password, pwCheck.password)) {

        /* PASSWORD UPDATE */
        payload.password = bcrypt.hashSync(payload.passwordHash, salt)
        delete payload.passwordHash
      }
    }
  } catch (error) {
    console.log("An error occurred while verifying the password: ", error)
  }
  

  const updatedUser = await User.findByIdAndUpdate(req.params.userId, payload, {
    new: true,
  })
res.json(updatedUser)
})

/* DELETE USER */
router.delete('/:userId', async (req, res) => {
  await User.findByIdAndDelete(req.params.userId)
  res.status(202).json({ message: 'User successfully deleted' })
})

// PURCHASES BY SPECIFIC USER
router.get('/:userId/purchases', async (req, res) => {
  try {
    const purchaseByUser = await Purchase.findById(req.params.userId)
      .populate('user')
      .populate('product');
    res.json(purchaseByUser);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching purchases', error });
  }
});



module.exports = router