const router = require("express").Router();
const Product = require("../models/Product.model")


/* GET ALL PRODUCTS */
router.get('/', async (req, res) => {
  const allProducts = await Product.find()
  res.json(allProducts)
})

/* GET ONE PRODUCT */
router.get('/:productId', async (req, res) => {
  console.log(req.params)
  const product = await Product.findById(req.params.productId)
  res.json(product)
})

/* CREATE PRODUCT */
router.post('/', async (req, res) => {
  const newProduct = await Product.create(req.body)
  res.status(201).json(newProduct)
})

/* UPDATE PRODUCT */
router.put('/:productId', async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
    new: true,
  })
  res.json(updatedProduct)
})

/* DELETE PRODUCT */
router.delete('/:productId', async (req, res) => {
  await Product.findByIdAndDelete(req.params.productId)
  res.status(202).json({ message: 'Product successfully deleted' })
})

module.exports = router