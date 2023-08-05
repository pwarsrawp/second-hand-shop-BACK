const { Schema, model } = require("mongoose");

// template for category enum : ["Arts and Crafts","Musical Instruments", "Literature", "Bycicles", "Fashion and Accesories", "Electronics", "Automotive", "Miscellaneous", ],
// template for item condition enum: ["new", "as good as new", "good", "fair", "has given it all"]
const productSchema = new Schema(
  {
    title:{
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    category: {
      type: String,
      trim: true,
      required: true,
      enum: ["Arts and Crafts","Musical Instruments","Literature", "Bycicles", "Fashion and Accesories", "Electronics", "Automotive", "Miscellaneous"],
    },
    price: {
      type: Number,
      min: 0,
      trim: true,
      required: true,
    },
    item_condition: {
      type: String,
      enum: ["new", "as good as new", "good", "fair", "has given it all"],
    },
    imageUrl: {
      type: String,
      default: String,
    },
    state: {
      type: String,
      enum: ["available", "reserved", "sold"],
    },
    favorite: {
      type: Boolean
    },
    wishlist: {
      type: Boolean
    },
    seller: {
      type: String,
      trim: true,
      required: true
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Product = model("Product", productSchema);

module.exports = Product;