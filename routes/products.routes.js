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
  const oneProduct = await Product.findById(req.params.productId)
  res.json(oneProduct)
})

/* CREATE PRODUCT */
router.post('/', uploader.single("imageUrl"), async (req, res) => {
  try {
    
    const { title, description, category, price, item_condition, state, sold, wishlist, seller  } = req.body;
    const imageUrl = req.file.path; // Get the Cloudinary URL from multer

    const newProduct = await Product.create({
      title,
      description,
      category,
      price,
      item_condition,
      imageUrl,
      state,
      sold,
      seller
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error creating product', message: error.message });
  }
});



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