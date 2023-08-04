const router = require("express").Router();
const Purchases = require("../models/Purchase.model")


/* GET ALL PURCHASES */
router.get('/', async (req, res) => {
  const allPurchases = await Purchase.find()
  res.json(allPurchases)
})

/* GET ONE PURCHASE */
router.get('/:purchaseId', async (req, res) => {
  console.log(req.params)
  const onePurchase = await Purchase.findById(req.params.purchaseId)
  res.json(onePurchase)
})

/* CREATE PURCHASE */
router.post('/', async (req, res) => {
  const newPurchase = await Purchase.create(req.body)
  res.status(201).json(newPurchase)
})

/* UPDATE PURCHASE */
router.put('/:purchaseId', async (req, res) => {
  const updatedPurchase = await Purchase.findByIdAndUpdate(req.params.purchaseId, req.body, {
    new: true,
  })
  res.json(updatedPurchase)
})

/* DELETE PURCHASE */
router.delete('/:purchaseId', async (req, res) => {
  await Purchase.findByIdAndDelete(req.params.purchaseId)
  res.status(202).json({ message: 'Purchase successfully deleted' })
})

module.exports = router