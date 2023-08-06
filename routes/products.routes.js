const router = require("express").Router();
const Product = require("../models/Product.model")
const uploader = require('../config/cloudinary.config');

/* GET ALL PRODUCTS */
router.get('/', async (req, res) => {
  const allProducts = await Product.find()
  res.json(allProducts)
})

/* GET ONE PRODUCT */
router.get('/:productId', async (req, res) => {
  console.log(req.params)
  const oneProduct = await Product.findById(req.params.productId)
  res.json(oneProduct)
})

/* CREATE PRODUCT */
router.post('/', uploader.single("imageUrl"), async (req, res) => {
  const newProduct = await Product.create(req.body)
  res.status(201).json(newProduct)
})

/* UPDATE PRODUCT */
router.put('/:productId', uploader.single("imageUrl"), async (req, res) => {
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