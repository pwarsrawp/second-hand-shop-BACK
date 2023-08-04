const router = require("express").Router();
const Purchases = require("../models/Purchases.model")


/* GET ALL PURCHASES */
router.get('/', async (req, res) => {
  const allPurchases = await Purchases.find()
  res.json(allPurchases)
})

/* GET ONE PURCHASE */
router.get('/:purchaseId', async (req, res) => {
  console.log(req.params)
  const onePurchase = await Purchases.findById(req.params.purchaseId)
  res.json(onePurchase)
})

/* CREATE PURCHASE */
router.post('/', async (req, res) => {
  const newPurchase = await Purchases.create(req.body)
  res.status(201).json(newPurchase)
})

/* UPDATE PURCHASE */
router.put('/:purchaseId', async (req, res) => {
  const updatedPurchase = await Purchases.findByIdAndUpdate(req.params.purchaseId, req.body, {
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